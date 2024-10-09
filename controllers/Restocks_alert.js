const AlertR = require('../models/Restocks_alert')
const Product = require('../models/Product')
const AI = require('../prediction/prediction')

/**
 * Retrieves all restock alerts from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all alerts or an error message.
 */
exports.GetAllAlerts = (req, res, next) => {

    AlertR.find()
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));


};

/**
 * Retrieves a single restock alert by its ID.
 *
 * @param {Object} req - Express request object, containing the alert ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the alert or an error message.
 */
exports.GetOneAlerts = (req, res, next) => {
    const id = req.params.id;
    AlertR.findById(id)
        .then(alert => res.status(200).json(alert))
        .catch(error => res.status(500).json(error));
};

/**
 * Creates restock alerts based on product stock predictions.
 *
 * @param {Object} nFdata - Data containing product stock predictions.
 * @returns {void} Creates new alerts if a product is predicted to miss stock and logs success or error.
 */
function CreateData(nFdata){
    const data = JSON.parse(nFdata)
    console.log(data);
    data.predictions.forEach((item) => {
        if(item.Plan_to_miss){
            const sku_id = item.sku;
            const why = item.why;

            Product.find({sku_id: sku_id})
                .then((res)=>{
                    const currentlvl = res.Current_stock;

                    const newAlert = new AlertR({

                        ref_product: sku_id,
                        current_level: currentlvl,
                        reason: why,

                    })
                    newAlert.save()
                        .then(()=>{
                            console.log('created success')})
                        .catch(error => console.log(error));
                })
                .catch(error => {
                    console.log(error)});



        }
    })
}


/**
 * Updates a restock alert by its ID.
 *
 * @param {Object} req - Express request object, containing the alert ID in the parameters and the updated data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.UpdateAlerts = (req, res, next) => {
    AlertR.findByIdAndUpdate({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(201).json({message: 'Alert updated successfully.'}))
        .catch(error => res.status(400).json(error));

};

/**
 * Deletes a restock alert by its ID.
 *
 * @param {Object} req - Express request object, containing the alert ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.DeleteAlerts = (req, res, next) => {
    AlertR.deleteOne({ _id: req.params.id })
        .then(() => res.status(201).json({message: 'Alert deleted successfully.'}))
        .catch(error => res.status(400).json(error));
};


exports.CallIaPrediction = async (req, res, next) => {

    await AI.CreateData();
    setTimeout(async ()=>{
        try {
            const prediction = await AI.getPredictionIa()
            responseFromAI = prediction.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
            CreateData(responseFromAI);
            res.status(200).json(JSON.parse(responseFromAI));
        }catch (error){
            res.status(500).json(error);
        }
    },5_00)




}