---
title: User model
---
# Introduction

This document will walk you through the implementation of the User model feature.

The feature introduces a User schema to define the structure of user documents in the database.

We will cover:

1. The structure of the User schema.
2. The use of plugins for schema validation.

# User schema structure

<SwmSnippet path="/models/User.js" line="4">

---

The User schema defines the structure of user documents in the database. It includes fields for the user's name, email, password, role, and creation date. Each field has specific constraints and defaults to ensure data integrity.

```
/**
 * User Schema defines the structure of the User documents in the database.
 *
 * @typedef {Object} User
 * @property {String} name - The name of the user.
 * @property {String} email - The email of the user, must be unique.
 * @property {String} password - The password for the user account.
 * @property {String} role - The role of the user, either 'ADMIN' or 'USER'. Defaults to 'USER'.
 * @property {Date} Create - The date when the user was created, defaults to the current date and time.
 */
const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },
    Create: { type: Date, default: Date.now },
})
```

---

</SwmSnippet>

# Schema validation

<SwmSnippet path="/models/User.js" line="25">

---

To ensure that the data adheres to the defined schema, we use the Validator plugin. This plugin adds pre-save validation for the schema, ensuring that all required fields are present and correctly formatted before saving to the database.

```

UserSchema.plugin(Validator)

```

---

</SwmSnippet>

This concludes the walkthrough of the User model feature. The schema structure and validation plugin ensure that user data is consistently stored and validated.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
