---
title: Product router
---
# Introduction

This document will walk you through the implementation of the product route feature.

The feature introduces CRUD operations for products via a RESTful API.

We will cover:

1. How the routes are defined.
2. The purpose of each route.
3. How these routes interact with the product controller.

# Defining the routes

We define the routes in <SwmPath>[routers/Product.js](/routers/Product.js)</SwmPath>. Each route corresponds to a specific CRUD operation.

# Get all products

<SwmSnippet path="/routers/Product.js" line="10">

---

This route handles fetching all products.

```
router.get('/', ProductCtrl.GetAllProducts);
```

---

</SwmSnippet>

# Get one product by SKU

<SwmSnippet path="/routers/Product.js" line="11">

---

This route handles fetching a single product based on its SKU.

```
router.get('/:sku', ProductCtrl.GetOneProduct);
```

---

</SwmSnippet>

# Create a new product

<SwmSnippet path="/routers/Product.js" line="12">

---

This route handles the creation of a new product.

```
router.post('/', ProductCtrl.CreateProduct);
```

---

</SwmSnippet>

# Update an existing product by SKU

<SwmSnippet path="/routers/Product.js" line="13">

---

This route handles updating an existing product based on its SKU.

```
router.put('/:sku', ProductCtrl.UpdateProduct);
```

---

</SwmSnippet>

# Delete a product by SKU

<SwmSnippet path="/routers/Product.js" line="14">

---

This route handles deleting a product based on its SKU.

```
router.delete('/:sku', ProductCtrl.DeleteProduct);
```

---

</SwmSnippet>

# Conclusion

Each route is mapped to a specific controller function in <SwmToken path="/routers/Product.js" pos="10:9:9" line-data="router.get(&#39;/&#39;, ProductCtrl.GetAllProducts);">`ProductCtrl`</SwmToken>. This structure ensures that each CRUD operation is handled appropriately and keeps the code organized.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
