---
title: Restocks alert Controller
---
# Introduction

This document will walk you through the implementation of the Restocks Alert Controller feature.

The feature allows for managing restock alerts, including retrieving, creating, updating, and deleting alerts. Additionally, it integrates with an AI prediction service to create alerts based on stock predictions.

We will cover:

1. How restock alerts are retrieved.
2. How a single restock alert is retrieved.
3. How restock alerts are created based on AI predictions.
4. How restock alerts are updated.
5. How restock alerts are deleted.

# Retrieving all restock alerts

<SwmSnippet path="/controllers/Restocks_alert.js" line="5">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="13:2:2" line-data="exports.GetAllAlerts = (req, res, next) =&gt; {">`GetAllAlerts`</SwmToken> function retrieves all restock alerts from the database and sends them as a JSON response.

```
/**
 * Retrieves all restock alerts from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all alerts or an error message.
 */
exports.GetAllAlerts = (req, res, next) => {
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Restocks_alert.js" line="14">

---

The function uses <SwmToken path="/controllers/Restocks_alert.js" pos="15:1:5" line-data="    AlertR.find()">`AlertR.find()`</SwmToken> to query the database and handles the response or error accordingly.

```

    AlertR.find()
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));


};
```

---

</SwmSnippet>

# Retrieving a single restock alert

<SwmSnippet path="/controllers/Restocks_alert.js" line="22">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="30:2:2" line-data="exports.GetOneAlerts = (req, res, next) =&gt; {">`GetOneAlerts`</SwmToken> function retrieves a single restock alert by its ID from the request parameters and sends it as a JSON response.

```
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
```

---

</SwmSnippet>

# Creating restock alerts based on AI predictions

<SwmSnippet path="/controllers/Restocks_alert.js" line="37">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="43:2:2" line-data="function CreateData(nFdata){">`CreateData`</SwmToken> function creates restock alerts based on product stock predictions. It parses the input data, checks if a product is predicted to miss stock, and creates a new alert if necessary.

```
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
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Restocks_alert.js" line="50">

---

The function checks if an unresolved alert already exists for the product. If not, it retrieves the current stock level and creates a new alert.

```

            AlertR.findOne({ref_product: sku_id, resolve:false})
                .then((res)=>{


                    if(!res){
                        Product.find({sku_id: sku_id})
                            .then((res)=>{
                                const currentlvl = res.Current_stock;
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Restocks_alert.js" line="59">

---

The new alert is then saved to the database.

```

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
```

---

</SwmSnippet>

# Updating a restock alert

<SwmSnippet path="/controllers/Restocks_alert.js" line="86">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="94:2:2" line-data="exports.UpdateAlerts = (req, res, next) =&gt; {">`UpdateAlerts`</SwmToken> function updates a restock alert by its ID with the data provided in the request body and sends a success message as a JSON response.

```
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
```

---

</SwmSnippet>

# Deleting a restock alert

<SwmSnippet path="/controllers/Restocks_alert.js" line="101">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="109:2:2" line-data="exports.DeleteAlerts = (req, res, next) =&gt; {">`DeleteAlerts`</SwmToken> function deletes a restock alert by its ID and sends a success message as a JSON response.

```
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
```

---

</SwmSnippet>

# Integrating AI predictions

<SwmSnippet path="controllers/Restocks_alert.js" line="116">

---

The <SwmToken path="/controllers/Restocks_alert.js" pos="116:2:2" line-data="exports.CallIaPrediction = async (req, res, next) =&gt; {">`CallIaPrediction`</SwmToken> function calls an AI service to get stock predictions, processes the response, and creates restock alerts based on the predictions.

````
exports.CallIaPrediction = async (req, res, next) => {

    await AI.CreateData();
    setTimeout(async ()=>{
        try {
            const prediction = await AI.getPredictionIa()
            responseFromAI = prediction.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
            CreateData(responseFromAI);
            res.status(200).json({message:"Prediction get successfully."});
        }catch (error){
            res.status(500).json(error);
        }
    },5_00)




}
````

---

</SwmSnippet>

This concludes the walkthrough of the Restocks Alert Controller feature. Each function is designed to handle specific aspects of managing restock alerts, ensuring that the system can effectively track and respond to stock predictions.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
