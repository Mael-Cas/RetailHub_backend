---
title: Product Controller
---
# Introduction

This document will walk you through the implementation of the Product Controller feature.

The feature provides CRUD operations for products in the database.

We will cover:

1. Retrieving all products.
2. Retrieving a single product by SKU.
3. Creating a new product.
4. Updating an existing product by SKU.
5. Deleting a product by SKU.

# Retrieving all products

<SwmSnippet path="/controllers/Product.js" line="3">

---

The <SwmToken path="/controllers/Product.js" pos="11:2:2" line-data="exports.GetAllProducts = (req, res, next)=&gt;{">`GetAllProducts`</SwmToken> function retrieves all products from the database. It sends a JSON response with the products or an error message if no products are found or if there is a server error.

```
/**
 * Retrieves all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all products or an error message.
 */
exports.GetAllProducts = (req, res, next)=>{
    Product.find()
        .then(products => {
            if(!products || products.length === 0) {
                res.status(404).send('No product found');
            }else{
                res.status(200).json(products);
            }
        })
        .catch(error => res.status(500).json({ message : 'Server error', error : error.message }));
};
```

---

</SwmSnippet>

# Retrieving a single product by SKU

<SwmSnippet path="/controllers/Product.js" line="23">

---

The <SwmToken path="/controllers/Product.js" pos="31:2:2" line-data="exports.GetOneProduct = (req, res, next)=&gt;{">`GetOneProduct`</SwmToken> function retrieves a single product based on its SKU. It extracts the SKU from the request parameters and queries the database for the product. It sends a JSON response with the product or an error message if the product is not found or if there is a server error.

```
/**
 * Retrieves a single product from the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the product or an error message.
 */
exports.GetOneProduct = (req, res, next)=>{
    const productSKU = req.params.sku; // Extract SKU from request parameters

    Product.findOne({ SKU: productSKU })
    .then(product => {

        if(!product) {
            res.status(404).json({message : 'Product not found'});
        }else{
            res.status(200).json(product);
        }
    })
    .catch(error => res.status(400).json({ message : 'Server error', error : error.message }));
};
```

---

</SwmSnippet>

# Creating a new product

<SwmSnippet path="/controllers/Product.js" line="46">

---

The <SwmToken path="/controllers/Product.js" pos="54:2:2" line-data="exports.CreateProduct = (req, res, next)=&gt;{">`CreateProduct`</SwmToken> function creates a new product and saves it to the database. It first checks if a product with the same SKU already exists. If it does, it sends an error message. Otherwise, it creates a new product with the provided data and saves it to the database, sending a success message or an error message if there is a server error.

```
/**
 * Creates a new product and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the product data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.CreateProduct = (req, res, next)=>{

    const SKU = req.params.sku;

    Product.findOne({ SKU: SKU })
        .then(existingProduct => {
            if(existingProduct) {
                return res.status(400).json({message : 'Product already exists'});
            }

            const newProduct = new Product({
                ...req.body,
                Update: Date.now(),

            });
            newProduct.save()
                .then(() => {
                    res.status(201).json({ message: 'Product created successfully'});
                })
                .catch(error => {
                    res.status(500).json({ message: 'Error saving the product', error: error.message });
                });
        })
        .catch(error => res.status(400).json({ message : 'Server error', error : error.message }));
};
```

---

</SwmSnippet>

# Updating an existing product by SKU

<SwmSnippet path="/controllers/Product.js" line="80">

---

The <SwmToken path="/controllers/Product.js" pos="88:2:2" line-data="exports.UpdateProduct = (req, res, next) =&gt; {">`UpdateProduct`</SwmToken> function updates an existing product based on its SKU. It extracts the SKU and the updated product data from the request. It then updates the product in the database and sends a success message or an error message if the product is not found or if there is a server error.

```
/**
 * Updates an existing product in the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters and the updated product data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.UpdateProduct = (req, res, next) => {
    const productSKU = req.params.sku; // Extract SKU from request parameters
    const updatedData = req.body; // Extract updated product data from request body

    Product.findOneAndUpdate({ SKU: productSKU }, updatedData, { new: true, runValidators: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error', error: error.message });
        });
};
```

---

</SwmSnippet>

# Deleting a product by SKU

<SwmSnippet path="/controllers/Product.js" line="105">

---

The <SwmToken path="/controllers/Product.js" pos="113:2:2" line-data="exports.DeleteProduct = (req, res, next)=&gt;{">`DeleteProduct`</SwmToken> function deletes a product based on its SKU. It extracts the SKU from the request parameters and deletes the product from the database. It sends a success message or an error message if the product is not found or if there is a server error.

```
/**
 * Deletes a product from the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.DeleteProduct = (req, res, next)=>{
    const productSKU = req.params.sku;

    Product.findOneAndDelete({ SKU: productSKU })
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully'});
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error', error: error.message });
        });
};
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
