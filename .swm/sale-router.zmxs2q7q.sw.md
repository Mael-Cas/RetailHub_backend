---
title: Sale router
---
# Introduction

This document will walk you through the implementation of the Sale router feature.

The feature introduces a new router for handling sales-related operations.

We will cover:

1. How the router handles fetching all sales.
2. How the router handles fetching a single sale by ID.
3. How the router handles creating a new sale.
4. How the router handles updating an existing sale.
5. How the router handles deleting a sale by ID.

# Fetching all sales

<SwmSnippet path="/routers/Sale.js" line="8">

---

The router defines a route to fetch all sales. This is handled by the <SwmToken path="/routers/Sale.js" pos="8:11:11" line-data="router.get(&#39;/&#39;, SaleCtrl.GetAllSales);">`GetAllSales`</SwmToken> method in the <SwmToken path="/routers/Sale.js" pos="8:9:9" line-data="router.get(&#39;/&#39;, SaleCtrl.GetAllSales);">`SaleCtrl`</SwmToken> controller.

```
router.get('/', SaleCtrl.GetAllSales);
```

---

</SwmSnippet>

# Fetching a single sale by ID

<SwmSnippet path="/routers/Sale.js" line="9">

---

To fetch a single sale by its ID, the router uses the <SwmToken path="/routers/Sale.js" pos="9:12:12" line-data="router.get(&#39;/:id&#39;, SaleCtrl.GetOneSale);">`GetOneSale`</SwmToken> method from the <SwmToken path="/routers/Sale.js" pos="9:10:10" line-data="router.get(&#39;/:id&#39;, SaleCtrl.GetOneSale);">`SaleCtrl`</SwmToken> controller.

```
router.get('/:id', SaleCtrl.GetOneSale);
```

---

</SwmSnippet>

# Creating a new sale

<SwmSnippet path="/routers/Sale.js" line="10">

---

For creating a new sale, the router defines a POST route that invokes the <SwmToken path="/routers/Sale.js" pos="10:11:11" line-data="router.post(&#39;/&#39;, SaleCtrl.CreateSale);">`CreateSale`</SwmToken> method in the <SwmToken path="/routers/Sale.js" pos="10:9:9" line-data="router.post(&#39;/&#39;, SaleCtrl.CreateSale);">`SaleCtrl`</SwmToken> controller.

```
router.post('/', SaleCtrl.CreateSale);
```

---

</SwmSnippet>

# Updating an existing sale

<SwmSnippet path="/routers/Sale.js" line="11">

---

To update an existing sale, the router uses a PUT route that calls the <SwmToken path="/routers/Sale.js" pos="11:12:12" line-data="router.put(&#39;/:id&#39;, SaleCtrl.UpdateSale);">`UpdateSale`</SwmToken> method from the <SwmToken path="/routers/Sale.js" pos="11:10:10" line-data="router.put(&#39;/:id&#39;, SaleCtrl.UpdateSale);">`SaleCtrl`</SwmToken> controller.

```
router.put('/:id', SaleCtrl.UpdateSale);
```

---

</SwmSnippet>

# Deleting a sale by ID

<SwmSnippet path="/routers/Sale.js" line="12">

---

Finally, to delete a sale by its ID, the router defines a DELETE route that uses the <SwmToken path="/routers/Sale.js" pos="12:12:12" line-data="router.delete(&#39;/:id&#39;, SaleCtrl.DeleteSale);">`DeleteSale`</SwmToken> method from the <SwmToken path="/routers/Sale.js" pos="12:10:10" line-data="router.delete(&#39;/:id&#39;, SaleCtrl.DeleteSale);">`SaleCtrl`</SwmToken> controller.

```
router.delete('/:id', SaleCtrl.DeleteSale);
```

---

</SwmSnippet>

This setup ensures that all CRUD operations for sales are handled efficiently through the defined routes.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
