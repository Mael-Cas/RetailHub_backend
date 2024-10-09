---
title: Customer model
---
# Introduction

This document will walk you through the implementation of the Customer model feature.

The feature introduces a new schema for customer data in the database.

We will cover:

1. Why we define the Customer schema the way we do.
2. Why we use a plugin for validation.

# Defining the customer schema

<SwmSnippet path="/models/Customer.js" line="4">

---

The Customer schema defines the structure of customer documents in the database. This schema ensures that each customer has a name, email, phone number, address, and an optional invoice request status.

```
/**
 * Customer Schema defines the structure of the Customer documents in the database.
 *
 * @typedef {Object} Customer
 * @property {String} name - The name of the customer.
 * @property {String} email - The email of the customer, which must be unique and is required.
 * @property {String} phone - The phone number of the customer, which must be unique and is required.
 * @property {String} address - The address of the customer, required.
 * @property {Boolean} invoice - Indicates if the customer has requested an invoice. Defaults to `false`.
 */
const CustomerSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    invoice: {type: Boolean, default: false},
})
```

---

</SwmSnippet>

# Adding validation plugin

<SwmSnippet path="/models/Customer.js" line="21">

---

We use a validation plugin to enforce schema rules and ensure data integrity. This helps catch errors early and maintain consistent data.

```

CustomerSchema.plugin(Validator);
```

---

</SwmSnippet>

This concludes the walkthrough of the Customer model feature. The schema and validation plugin together ensure that customer data is structured and validated correctly.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
