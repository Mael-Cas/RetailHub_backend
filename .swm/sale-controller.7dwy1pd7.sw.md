---
title: Sale Controller
---
# Introduction

This document will walk you through the implementation of the Sale Controller feature.

The feature allows for:

1. Retrieving all sales with optional filters for year, month, and week.
2. Retrieving a specific sale by its ID.
3. Creating a new sale while updating product stock levels.
4. Updating an existing sale.
5. Deleting a sale by its ID.

We will cover:

1. How sales are retrieved with optional filters.
2. How a specific sale is retrieved by its ID.
3. The process of creating a new sale and updating stock levels.
4. Updating an existing sale.
5. Deleting a sale by its ID.

# Retrieving all sales with optional filters

The <SwmToken path="/controllers/Sale.js" pos="13:2:2" line-data="exports.GetAllSales = (req, res, next) =&gt; {">`GetAllSales`</SwmToken> function retrieves all sales based on optional year, month, and week filters. This is useful for generating reports or analyzing sales data over different periods.

<SwmSnippet path="/controllers/Sale.js" line="5">

---

We start by extracting the query parameters from the request object.

```
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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="15">

---

Next, we determine which filters are active by checking the query parameters.

```

    const isYears = years === 'true';
    const isMonth = months === 'true';
    const isWeek = weeks === 'true';


    let groupStage = {};
    let matchStage = {};
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="23">

---

If the year filter is active, we group the sales by year.

```


    if (isYears) {
        groupStage = {
            _id: {year: {$year: "$sale_date"}},
            total_sales: { $sum: 1 },
            sales: { $push: "$$ROOT" }
        };
    }
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="32">

---

If the month filter is active, and a specific year is provided, we filter by that year and group the sales by year and month.

```


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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="47">

---

If the week filter is active, and both year and week are provided, we filter by those values and group the sales by year and week.

```


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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="69">

---

We then build the aggregation pipeline based on the active filters.

```


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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="83">

---

Finally, we execute the aggregation pipeline and send the results as a JSON response.

```


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
```

---

</SwmSnippet>

# Retrieving a specific sale by its ID

The <SwmToken path="/controllers/Sale.js" pos="106:2:2" line-data="exports.GetOneSale = (req, res, next) =&gt; {">`GetOneSale`</SwmToken> function retrieves a specific sale by its ID. This is useful for viewing detailed information about a particular sale.

<SwmSnippet path="/controllers/Sale.js" line="98">

---

We start by extracting the sale ID from the request parameters and then query the database for that sale.

```
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
```

---

</SwmSnippet>

# Creating a new sale and updating stock levels

The <SwmToken path="/controllers/Sale.js" pos="120:2:2" line-data="exports.CreateSale = (req, res, next) =&gt; {">`CreateSale`</SwmToken> function creates a new sale and updates the stock levels of the products involved. This ensures that the stock levels are always accurate.

<SwmSnippet path="/controllers/Sale.js" line="120">

---

We start by validating the stock levels for each product in the sale.

```
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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="138">

---

If all products have sufficient stock, we update the stock levels.

```

    Promise.all(checkStockPromises)
        .then(results => {
            if (valid) {

                const updateStockPromises = results.map(({ product, StockProduct }) => {
                    StockProduct.Current_stock -= product.quantity;
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="145">

---

We then save the new sale to the database and send a success response.

```

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
```

---

</SwmSnippet>

# Updating an existing sale

The <SwmToken path="/controllers/Sale.js" pos="184:2:2" line-data="exports.UpdateSale = (req, res, next) =&gt; {">`UpdateSale`</SwmToken> function updates an existing sale. This is useful for correcting mistakes or updating information about a sale.

<SwmSnippet path="/controllers/Sale.js" line="176">

---

We start by extracting the sale ID from the request parameters and then update the sale with the new data.

```
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
```

---

</SwmSnippet>

# Deleting a sale by its ID

The <SwmToken path="/controllers/Sale.js" pos="201:2:2" line-data="exports.DeleteSale = (req, res, next) =&gt; {">`DeleteSale`</SwmToken> function deletes a specific sale by its ID. This is useful for removing incorrect or outdated sales records.

<SwmSnippet path="/controllers/Sale.js" line="193">

---

We start by extracting the sale ID from the request parameters and then query the database for that sale.

```
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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Sale.js" line="212">

---

If the sale exists, we delete it and send a success response.

```

        })
        .catch(error => res.status(500).json({ message : 'Server error', error : error.message }));
};
```

---

</SwmSnippet>

This concludes the walkthrough of the Sale Controller feature. Each function is designed to handle specific tasks related to sales management, ensuring that the system remains consistent and accurate.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
