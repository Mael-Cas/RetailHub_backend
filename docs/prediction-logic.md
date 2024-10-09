---
title: Prediction Logic
---
# Introduction

This document will walk you through the implementation of the prediction logic feature.

The feature involves:

1. Loading and saving stock data to a JSON file.
2. Creating sales data for the current week.
3. Interacting with an AI model to predict product shortages.

We will cover:

1. Why we save and load stock data from JSON.
2. How we create and process sales data for predictions.
3. How we interact with the AI model for predictions.

# Saving and loading stock data

<SwmSnippet path="/prediction/prediction.js" line="15">

---

We need to persist stock data to ensure consistency across sessions. The <SwmToken path="/prediction/prediction.js" pos="15:2:2" line-data="function SaveToJson(){">`SaveToJson`</SwmToken> function writes the stock data to a JSON file.

```
function SaveToJson(){


    fs.writeFileSync('./storeData/data.json', JSON.stringify(startStock, null, 2), 'utf8');

}
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="22">

---

The <SwmToken path="/prediction/prediction.js" pos="22:2:2" line-data="function GetFromJson(){">`GetFromJson`</SwmToken> function reads the stock data from the JSON file and parses it into a <SwmToken path="/prediction/prediction.js" pos="27:15:15" line-data="        // Convertir les données JSON en objet JavaScript">`JavaScript`</SwmToken> object. This ensures that we have the latest stock data available for processing.

```
function GetFromJson(){
    try {
        // Lire le fichier JSON
        const data =  fs.readFileSync('./storeData/data.json', 'utf8');

        // Convertir les données JSON en objet JavaScript
        startStock = JSON.parse(data);

    } catch (error) {
        console.error('Error reading or parsing file:', error);
        return null; // Retourner null en cas d'erreur
    }
}
```

---

</SwmSnippet>

# Creating sales data for the current week

<SwmSnippet path="/prediction/prediction.js" line="36">

---

The <SwmToken path="/prediction/prediction.js" pos="43:2:2" line-data="exports.CreateData = () =&gt; {">`CreateData`</SwmToken> function is responsible for generating sales data for the current week. This data is essential for making accurate predictions.

```
/**
 * Create sales data for the current week for predictions.
 * This function retrieves sales from the start to the end of the week,
 * processes the sales data, and prepares it for prediction.
 *
 * @returns {Promise<void>}
 */
exports.CreateData = () => {
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="44">

---

First, we load the stock data from the JSON file.

```

    GetFromJson();


    const now = new Date();
    const startOfWeek = new Date(now);
    const dayOfWeek = now.getDay(); // Renvoie le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Calcule la différence pour atteindre lundi
    startOfWeek.setDate(now.getDate() - diffToMonday); // Ajuste la date pour qu'elle soit lundi
    startOfWeek.setHours(0, 0, 0, 0); // Met l'heure au début de la journée (00:00:00:000)
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="54">

---

We then calculate the start and end dates for the current week. This helps in filtering the sales data for the week.

```

// Fin de la semaine (samedi)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Ajoute 5 jours pour obtenir samedi
    endOfWeek.setHours(23, 59, 59, 999); // Met l'heure à la fin de la journée (23:59:59:999)


```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="61">

---

Next, we query the sales data for the current week from the database.

```



    Sales.find({
        sale_date: {
            $gte: new Date('2024-09-30T04:00:00.000Z'),  // Plus grand ou égal au début de la journée
            $lte: new Date()     // Moins ou égal à la fin de la journée
        }
    })
        .then(sales => {
            sales.forEach(sale => {
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="72">

---

We clean up the sales data by removing unnecessary fields. This reduces the payload size and focuses on relevant information.

```

                // Supprimer les champs inutiles
                const data = sale.toObject();

                delete data._id;
                delete data.customer_id;
                delete data.payment_status;
                delete data.payment_method;
                delete data.soldBy;
                delete data.is_invoiced;
                delete data.__v;
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="83">

---

We enrich the sales data with stock information for each product. This includes the current stock level and reorder level.

```

                data.products.forEach(product => {
                    delete product._id;

                    const stockInfo = startStock[product.SKU];


                    product.start_level = stockInfo.current_level;
                    product.reorder_level = stockInfo.reorder_level;
                })
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="93">

---

Finally, we prepare the cleaned and enriched sales data for prediction.

```


                jsondata.push(data)




```

---

</SwmSnippet>

# Retrieving product stock levels

<SwmSnippet path="/prediction/prediction.js" line="112">

---

The <SwmToken path="/prediction/prediction.js" pos="119:2:2" line-data="exports.getProductStock = () =&gt; {">`getProductStock`</SwmToken> function initializes the <SwmToken path="/prediction/prediction.js" pos="113:17:17" line-data=" * Retrieve product stock levels and initialize the startStock array.">`startStock`</SwmToken> array with current stock levels and reorder levels for each product. This data is then saved to a JSON file for future use.

```
/**
 * Retrieve product stock levels and initialize the startStock array.
 * This function populates the startStock variable with current stock levels
 * and reorder levels for each product, and saves the result in a JSON file.
 *
 * @returns {Promise<void>}
 */
exports.getProductStock = () => {
    Products.find()
        .then(products => {
            products.forEach(product => {
                const sku = product.SKU;
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="124">

---

We iterate over each product and populate the <SwmToken path="/prediction/prediction.js" pos="125:1:1" line-data="                startStock[sku] = {">`startStock`</SwmToken> array with the necessary stock information.

```

                startStock[sku] = {
                    current_level: product.Current_stock,
                    reorder_level: product.Reorder_level,
                };
            });

            // Appeler SaveToJson pour sauvegarder les informations dans un fichier JSON
            SaveToJson();
        })
        .catch(err => {
            console.error("Erreur lors de la récupération des stocks :", err);
        });
};
```

---

</SwmSnippet>

# Getting predictions from the AI model

<SwmSnippet path="/prediction/prediction.js" line="139">

---

The <SwmToken path="/prediction/prediction.js" pos="146:2:2" line-data="exports.getPredictionIa = async () =&gt;{">`getPredictionIa`</SwmToken> function interacts with the <SwmToken path="/prediction/prediction.js" pos="141:13:13" line-data=" * This function interacts with the OpenAI API to predict product shortages">`OpenAI`</SwmToken> API to predict product shortages for the next week based on the prepared sales data.

```
/**
 * Get predictions from the AI model based on the sales data.
 * This function interacts with the OpenAI API to predict product shortages
 * for the next week based on the prepared jsondata.
 *
 * @returns {Promise<ChatCompletion & {_request_id?: string | null}>}
 */
exports.getPredictionIa = async () =>{
```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="147">

---

We initialize the <SwmToken path="/prediction/prediction.js" pos="149:9:9" line-data="    const client = new OpenAI({">`OpenAI`</SwmToken> client with the API key.

```


    const client = new OpenAI({
        apiKey: process.env.API_KEY,
    });


```

---

</SwmSnippet>

<SwmSnippet path="/prediction/prediction.js" line="154">

---

We then send a request to the <SwmToken path="/prediction/prediction.js" pos="141:13:13" line-data=" * This function interacts with the OpenAI API to predict product shortages">`OpenAI`</SwmToken> API with the sales data and receive predictions in a structured JSON format.

```

    return chat = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: 'You are an assistant that predicts product shortages for the next week.'
            },
            {
                role: 'user',
                content: `Please predict whether the following products will be missing next week and provide the reason why.
                Takes into consideration the current date and events other than that date in order to better predict
                This is the data : ${JSON.stringify(jsondata)}.
                Please never change sku in the data you have the sku of all product sales in this week so don't change it.
            Respond in the following JSON format: 
            {
              "predictions": [
                { "sku": "", "Plan_to_miss": true, "why":""},
                ...
              ]
            }`
            }
        ],
        temperature: 0.1
    })
}
```

---

</SwmSnippet>

This concludes the walkthrough of the prediction logic feature. Each part of the implementation is designed to ensure accurate and efficient predictions based on the latest sales and stock data.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
