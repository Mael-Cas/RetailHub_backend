const Sale = require('../models/Sale');
const Product = require('../models/Product');


/**
 * Retrieves all sales based on optional year, month, and day filters.
 *
 * @param {Object} req - Express request object, containing optional year, month, and day in query parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with sales or an error message.
 */
exports.GetAllSales = (req, res, next) => {
    const { years, months, weeks, year, week: weekParam } = req.query;  // Ajout de 'year' et 'week' dans les paramètres

    const isYears = years === 'true';
    const isMonth = months === 'true';
    const isWeek = weeks === 'true';


    let groupStage = {};
    let matchStage = {};


    if (isYears) {
        groupStage = {
            _id: {year: {$year: "$sale_date"}},
            total_sales: { $sum: 1 },
            sales: { $push: "$$ROOT" }
        };
    }


    if (isMonth) {
        if (year) {
            matchStage = { $expr: { $eq: [{ $year: "$sale_date" }, parseInt(year)] } };  // Filtrer par année spécifiée
        }
        groupStage = {
            _id: {
                year: { $year: "$sale_date" },
                month: { $month: "$sale_date" }
            },
            total_sales: { $sum: 1 },
            sales: { $push: "$$ROOT" }
        };
    }


    if (isWeek) {
        if (year && weekParam) {
            matchStage = {
                $expr: {
                    $and: [
                        { $eq: [{ $isoWeekYear: "$sale_date" }, parseInt(year)] },
                        { $eq: [{ $isoWeek: "$sale_date" }, parseInt(weekParam)] }
                    ]
                }
            };
        }
        groupStage = {
            _id: {
                year: { $isoWeekYear: "$sale_date" },
                week: { $isoWeek: "$sale_date" }
            },
            total_sales: { $sum: 1 },
            sales: { $push: "$$ROOT" }
        };
    }


    let pipeline = [];

    if (Object.keys(groupStage).length > 0) {
        // Ajout du matchStage si défini
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }
        pipeline.push(
            { $group: groupStage },
            { $sort: { "_id": 1 } }  // Trier par ID (année/mois/semaine)
        );
    }


    Sale.aggregate(pipeline.length > 0 ? pipeline : [{ $match: {} }])
        .then(sales => {
            if (!sales || sales.length === 0) {
                res.status(404).send({ message: 'No sales found' });
            } else {
                res.status(200).json(sales);
            }
        })
        .catch(error => res.status(500).json({ message: 'Server error', error: error.message }));
};



/**
 * Retrieves a specific sale by its ID.
 *
 * @param {Object} req - Express request object, containing the sale ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the sale or an error message.
 */
exports.GetOneSale = (req, res, next) => {
    const saleId = req.params.id;
    Sale.findOne({ _id: saleId })
        .then(sale => {
            if(!sale) {
                res.status(404).send({message: 'No sale found'});
            }else{
                res.status(200).json(sale);
            }
        })
        .catch(error => res.status(500).json({ message : 'Server error', error : error.message }));
};


exports.CreateSale = (req, res, next) => {

    const products = req.body.products;
    let valid = true; // Variable pour valider tous les produits


    const checkStockPromises = products.map(product => {
        return Product.findOne({ SKU: product.SKU })
            .then(StockProduct => {
                // Vérification si la quantité demandée dépasse le stock disponible
                if (product.quantity > StockProduct.Current_stock) {
                    valid = false;
                    return Promise.reject(new Error(`Not enough stock for product SKU: ${product.SKU}`));
                } else {
                    return { product, StockProduct }; // Retourne les produits valides pour une future mise à jour
                }
            });
    });

    Promise.all(checkStockPromises)
        .then(results => {
            if (valid) {

                const updateStockPromises = results.map(({ product, StockProduct }) => {
                    StockProduct.Current_stock -= product.quantity;

                    return Product.findByIdAndUpdate(
                        { _id: StockProduct._id },
                        { Current_stock: StockProduct.Current_stock, Update: Date.now() }
                    ).then(() => {
                        console.log(`Product SKU: ${product.SKU} updated`);
                    });
                });


                return Promise.all(updateStockPromises).then(() => {
                    const NewSale = new Sale({
                        ...req.body,
                    });

                    return NewSale.save()
                        .then(() => res.status(201).json({ message: 'Sale saved successfully.' }))
                        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
                });
            }
        })
        .catch(error => {
            console.error(error.message);
            res.status(404).send({ message: error.message });
        });




};

/**
 * Creates a new sale, updating product stock levels.
 *
 * @param {Object} req - Express request object, containing the sale data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Validates product stock and creates a new sale if stock is sufficient.
 */
exports.UpdateSale = (req, res, next) => {
    const id_sale = req.params.id;
    Sale.updateOne({_id: id_sale}, {...req.body, _id: id_sale})
        .then(() => {
            res.status(200).json({ message: 'Sale saved successfully.' });
        })
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
};

/**
 * Deletes a specific sale by its ID.
 *
 * @param {Object} req - Express request object, containing the sale ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Deletes the sale and sends a success or error message.
 */
exports.DeleteSale = (req, res, next) => {
    const saleId = req.params.id;
    Sale.findOne({ _id: saleId })
        .then(sale => {
            if(!sale) {
                res.status(404).json({message: 'No sales found'});
            } else {
                Sale.deleteOne({ _id: saleId })
                    .then(() => res.status(200).json({ message: 'Sale deleted successfully', sale: sale }))
                    .catch(error => res.status(500).json({ message: 'Error deleting sale', error: error.message }));
            }

        })
        .catch(error => res.status(500).json({ message : 'Server error', error : error.message }));
};