---
title: Customer router
---
# Introduction

This document will walk you through the implementation of the customer route feature.

The feature introduces a set of routes to handle customer-related operations.

We will cover:

1. How the routes are defined.
2. The purpose of each route.
3. The overall structure and flow of the customer route.

# Defining the routes

We define the routes in <SwmPath>[routers/Customer.js](/routers/Customer.js)</SwmPath>. Each route corresponds to a specific customer operation.

# Get all customers

<SwmSnippet path="/routers/Customer.js" line="8">

---

This route handles fetching all customers.

```
router.get('/', CustomerCtrl.GetAllCustomers);
```

---

</SwmSnippet>

# Get one customer

<SwmSnippet path="/routers/Customer.js" line="9">

---

This route handles fetching a single customer by ID.

```
router.get('/:id', CustomerCtrl.GetOneCustomer);
```

---

</SwmSnippet>

# Create a customer

<SwmSnippet path="/routers/Customer.js" line="10">

---

This route handles creating a new customer.

```
router.post('/', CustomerCtrl.CreateCustomer);
```

---

</SwmSnippet>

# Update a customer

<SwmSnippet path="/routers/Customer.js" line="11">

---

This route handles updating an existing customer by ID.

```
router.put('/:id', CustomerCtrl.UpdateCustomer);
```

---

</SwmSnippet>

# Delete a customer

<SwmSnippet path="/routers/Customer.js" line="12">

---

This route handles deleting a customer by ID.

```
router.delete('/:id', CustomerCtrl.DeleteCustomer);
```

---

</SwmSnippet>

# Conclusion

The customer route feature provides a clear and organized way to manage customer data through defined endpoints. Each route is mapped to a specific controller function to handle the respective operation. This structure ensures that customer-related operations are easily maintainable and extendable.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
