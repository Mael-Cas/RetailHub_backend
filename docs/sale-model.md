---
title: Sale model
---
# Introduction

This document will walk you through the implementation of the Sale model feature.

The feature introduces a new schema for managing sales data in the database.

We will cover:

1. Why we need a Sale model.
2. The structure of the Sale schema.
3. Key properties and their significance.

# Why we need a Sale model

The Sale model is essential for tracking sales transactions in the database. It allows us to store detailed information about each sale, including the products sold, the customer, and the payment details.

# The structure of the Sale schema

<SwmSnippet path="/models/Sale.js" line="4">

---

The Sale schema defines the structure of the sales documents in the database. It ensures that all necessary information about a sale is captured and stored consistently.

```
/**
 * Sales Schema defines the structure of the Sales documents in the database.
 *
 * @typedef {Object} Sale
 * @property {Array<Object>} products - The array of products sold in this sale.
 * @property {String} products.SKU - The SKU of the product (reference to Product).
 * @property {Number} products.quantity - The quantity sold of this product.
 * @property {Number} products.price_per_unit - The price per unit of the product at the time of sale.
 * @property {Number} total_price - The total price of the sale.
 * @property {Date} sale_date - The date of the sale, defaulting to the current date and time.
 * @property {mongoose.Schema.Types.ObjectId} customer_id - The ID of the customer making the purchase (reference to Customer).
 * @property {String} payment_status - The status of the payment, can be 'Pending', 'Completed', or 'Cancelled'.
 * @property {String} payment_method - The method of payment used for this sale, e.g., 'Cash', 'Credit Card', etc.
 * @property {String} soldBy - The user who completed the sale (reference to User).
 * @property {Boolean} is_invoiced - Indicates whether the sale has been converted into an invoice, defaulting to false.
 */
const SalesSchema = mongoose.Schema({
    products: [
        {
            SKU: { type: String, ref: 'Product' }, // Référence au SKU du produit
            quantity: { type: Number, required: true },    // Quantité vendue de ce produit
            price_per_unit: { type: Number, required: true } // Prix unitaire du produit au moment de la vente
        }
    ],
    total_price: { type: Number, required: true },          // Prix total de la vente
    sale_date: { type: Date, default: Date.now },           // Date de la vente
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Référence au client
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }, // Statut du paiement
    payment_method: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal']
    }, // Méthode de paiement utilisée
    soldBy: { type: String, ref: 'User' },
    is_invoiced: { type: Boolean, default: false }          // Indique si la vente a été transformée en facture
});
```

---

</SwmSnippet>

# Key properties and their significance

- **products**: An array of objects representing the products sold in the sale. Each product includes the SKU, quantity, and price per unit.
- <SwmToken path="/models/Sale.js" pos="12:10:10" line-data=" * @property {Number} total_price - The total price of the sale.">`total_price`</SwmToken>: The total price of the sale, ensuring we can quickly access the total amount for any sale.
- <SwmToken path="/models/Sale.js" pos="13:10:10" line-data=" * @property {Date} sale_date - The date of the sale, defaulting to the current date and time.">`sale_date`</SwmToken>: The date of the sale, defaulting to the current date and time, which helps in tracking when the sale occurred.
- <SwmToken path="/models/Sale.js" pos="14:16:16" line-data=" * @property {mongoose.Schema.Types.ObjectId} customer_id - The ID of the customer making the purchase (reference to Customer).">`customer_id`</SwmToken>: A reference to the customer making the purchase, linking sales to customer records.
- <SwmToken path="/models/Sale.js" pos="15:10:10" line-data=" * @property {String} payment_status - The status of the payment, can be &#39;Pending&#39;, &#39;Completed&#39;, or &#39;Cancelled&#39;.">`payment_status`</SwmToken>: Indicates the status of the payment, which can be 'Pending', 'Completed', or 'Cancelled'. This helps in managing and tracking the payment lifecycle.
- <SwmToken path="/models/Sale.js" pos="16:10:10" line-data=" * @property {String} payment_method - The method of payment used for this sale, e.g., &#39;Cash&#39;, &#39;Credit Card&#39;, etc.">`payment_method`</SwmToken>: The method of payment used, such as 'Cash' or 'Credit Card', providing flexibility in payment options.
- <SwmToken path="/models/Sale.js" pos="17:10:10" line-data=" * @property {String} soldBy - The user who completed the sale (reference to User).">`soldBy`</SwmToken>: The user who completed the sale, linking the sale to the responsible employee.
- <SwmToken path="/models/Sale.js" pos="18:10:10" line-data=" * @property {Boolean} is_invoiced - Indicates whether the sale has been converted into an invoice, defaulting to false.">`is_invoiced`</SwmToken>: A boolean indicating whether the sale has been converted into an invoice, defaulting to false, which helps in managing the invoicing process.

This structure ensures that all relevant details about a sale are captured, facilitating efficient sales tracking and reporting.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
