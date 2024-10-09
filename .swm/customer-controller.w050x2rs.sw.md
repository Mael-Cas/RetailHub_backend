---
title: Customer Controller
---
# Introduction

This document will walk you through the implementation of the Customer Controller feature.

The feature provides CRUD operations for customer data in the database.

We will cover:

1. Retrieving all customers.
2. Retrieving a single customer by ID.
3. Creating a new customer.
4. Updating an existing customer.
5. Deleting a customer by ID.

# Retrieving all customers

<SwmSnippet path="/controllers/Customer.js" line="3">

---

The <SwmToken path="/controllers/Customer.js" pos="11:2:2" line-data="exports.GetAllCustomers = (req, res, next) =&gt; {">`GetAllCustomers`</SwmToken> function retrieves all customers from the database and sends a JSON response with the data or an error message.

```
/**
 * Retrieves all customers from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all customers or an error message.
 */
exports.GetAllCustomers = (req, res, next) => {
    Customer.find()
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));

};
```

---

</SwmSnippet>

# Retrieving a single customer by ID

<SwmSnippet path="/controllers/Customer.js" line="18">

---

The <SwmToken path="/controllers/Customer.js" pos="26:2:2" line-data="exports.GetOneCustomer = (req, res, next) =&gt; {">`GetOneCustomer`</SwmToken> function retrieves a single customer by its ID from the database. The ID is extracted from the request parameters.

```
/**
 * Retrieves a single customer from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the customer or an error message.
 */
exports.GetOneCustomer = (req, res, next) => {
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Customer.js" line="27">

---

The actual database query and response handling are done here:

```

    const id = req.params.id;
    Customer.findById(id)
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));

};
```

---

</SwmSnippet>

# Creating a new customer

<SwmSnippet path="/controllers/Customer.js" line="35">

---

The <SwmToken path="/controllers/Customer.js" pos="43:2:2" line-data="exports.CreateCustomer = (req, res, next) =&gt; {">`CreateCustomer`</SwmToken> function creates a new customer and saves it to the database. The customer data is taken from the request body.

```
/**
 * Creates a new customer and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the customer data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.CreateCustomer = (req, res, next) => {
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/Customer.js" line="44">

---

Before saving, the <SwmToken path="/controllers/Customer.js" pos="65:7:7" line-data="    Customer.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })">`_id`</SwmToken> field is deleted from the request body to avoid conflicts. The new customer is then saved, and a success or error message is sent.

```

    delete req.body._id;
    const customer = new Customer({
        ...req.body,
    });
    customer.save()
        .then(()=>res.status(201).json({message: 'Customer saved successfully.'}))
        .catch(error => res.status(400).json({message: 'Server error', error: error.message }));
```

---

</SwmSnippet>

# Updating an existing customer

<SwmSnippet path="/controllers/Customer.js" line="55">

---

The <SwmToken path="/controllers/Customer.js" pos="63:2:2" line-data="exports.UpdateCustomer = (req, res, next) =&gt; {">`UpdateCustomer`</SwmToken> function updates an existing customer by its ID. The ID and updated data are taken from the request parameters and body, respectively.

```
/**
 * Updates an existing customer by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters and updated data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.UpdateCustomer = (req, res, next) => {

    Customer.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Customer updated successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));

};
```

---

</SwmSnippet>

# Deleting a customer by ID

<SwmSnippet path="/controllers/Customer.js" line="71">

---

The <SwmToken path="/controllers/Customer.js" pos="79:2:2" line-data="exports.DeleteCustomer = (req, res, next) =&gt; {">`DeleteCustomer`</SwmToken> function deletes a customer from the database by its ID, which is taken from the request parameters.

```
/**
 * Deletes a customer from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.DeleteCustomer = (req, res, next) => {

    Customer.deleteOne({ _id: req.params.id })
        .then(()=>res.status(204).json({message :"delete succesfully"}))
        .catch(error => res.status(404).json({ message: 'Server error', error: error.message }))

};
```

---

</SwmSnippet>

This concludes the walkthrough of the Customer Controller feature. Each function is designed to handle specific CRUD operations, ensuring that customer data can be managed effectively.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
