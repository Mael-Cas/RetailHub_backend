---
title: Product model
---
# Introduction

This document will walk you through the implementation of the Product model feature.

The feature defines the structure and properties of a Product document in the database using Mongoose.

We will cover:

1. Why we need a Product schema.
2. What properties are included in the Product schema.
3. How the schema ensures data integrity and uniqueness.

# Why we need a Product schema

The Product schema is essential for defining the structure of product documents in the database. It ensures that each product has a consistent format and includes all necessary information.

# Properties included in the Product schema

<SwmSnippet path="/models/Product.js" line="3">

---

The schema includes various properties that describe a product. These properties are crucial for managing product information effectively.

```
/**
 * Product Schema defines the structure of the Product documents in the database.
 *
 * @typedef {Object} Product
 * @property {String} name - The name of the product.
 * @property {String} category - The category of the product.
 * @property {String} SKU - The Stock Keeping Unit, a unique identifier for the product, required.
 * @property {Number} price - The price of the product.
 * @property {Number} Current_stock - The current stock level of the product, required.
 * @property {Number} Reorder_level - The stock level at which the product should be reordered.
 * @property {String} Details - Additional details about the product.
 * @property {Date} Update - The date when the product was last updated.
 * @property {String} Image - The URL or path to the product's image.
 * @property {String} Slot - The storage slot or location for the product.
 */
const ProductSchema = mongoose.Schema({
    name: String,
    category: String,
    SKU : {type: String, unique:true, required: true},
    price: Number,
    Current_stock: {type: Number, required: true},
    Reorder_level: Number,
    Details: String,
    Update: Date,
    Image: String,
    Slot: String
})
```

---

</SwmSnippet>

# Ensuring data integrity and uniqueness

The schema uses Mongoose's features to enforce data integrity and uniqueness. For example, the SKU field is marked as unique and required, ensuring that each product has a unique identifier. The <SwmToken path="/models/Product.js" pos="11:10:10" line-data=" * @property {Number} Current_stock - The current stock level of the product, required.">`Current_stock`</SwmToken> field is also required, ensuring that stock levels are always recorded.

This approach helps maintain a reliable and consistent dataset for products in the database.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
