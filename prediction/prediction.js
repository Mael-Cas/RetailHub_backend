const Sales = require('../models/Sale')
const Products = require('../models/Product')

const { OpenAI } = require('openai')
const fs = require("node:fs");



//import OpenAI from "openai";

var startStock = {}
var jsondata = []


function SaveToJson(){


    fs.writeFileSync('./storeData/data.json', JSON.stringify(startStock, null, 2), 'utf8');

}

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

/**
 * Create sales data for the current week for predictions.
 * This function retrieves sales from the start to the end of the week,
 * processes the sales data, and prepares it for prediction.
 *
 * @returns {Promise<void>}
 */
exports.CreateData = () => {

    GetFromJson();


    const now = new Date();
    const startOfWeek = new Date(now);
    const dayOfWeek = now.getDay(); // Renvoie le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Calcule la différence pour atteindre lundi
    startOfWeek.setDate(now.getDate() - diffToMonday); // Ajuste la date pour qu'elle soit lundi
    startOfWeek.setHours(0, 0, 0, 0); // Met l'heure au début de la journée (00:00:00:000)

// Fin de la semaine (samedi)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Ajoute 5 jours pour obtenir samedi
    endOfWeek.setHours(23, 59, 59, 999); // Met l'heure à la fin de la journée (23:59:59:999)





    Sales.find({
        sale_date: {
            $gte: new Date('2024-09-30T04:00:00.000Z'),  // Plus grand ou égal au début de la journée
            $lte: new Date()     // Moins ou égal à la fin de la journée
        }
    })
        .then(sales => {
            sales.forEach(sale => {

                // Supprimer les champs inutiles
                const data = sale.toObject();

                delete data._id;
                delete data.customer_id;
                delete data.payment_status;
                delete data.payment_method;
                delete data.soldBy;
                delete data.is_invoiced;
                delete data.__v;

                data.products.forEach(product => {
                    delete product._id;

                    const stockInfo = startStock[product.SKU];


                    product.start_level = stockInfo.current_level;
                    product.reorder_level = stockInfo.reorder_level;
                })


                jsondata.push(data)





            });

        })
        .catch(err => {
            console.error("Erreur lors de la récupération des ventes :", err);
        });



}

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

/**
 * Get predictions from the AI model based on the sales data.
 * This function interacts with the OpenAI API to predict product shortages
 * for the next week based on the prepared jsondata.
 *
 * @returns {Promise<ChatCompletion & {_request_id?: string | null}>}
 */
exports.getPredictionIa = async () =>{


    const client = new OpenAI({
        apiKey: process.env.API_KEY,
    });



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




