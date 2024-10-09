---
title: Category model
---
# Introduction

This document will walk you through the implementation of the Category model feature.

The feature introduces a new schema for categories in the database, ensuring that each category has a unique name and adheres to validation rules.

We will cover:

1. The structure of the Category schema.
2. The importance of the unique and required constraints.
3. The role of the Validator plugin.

# Category schema structure

<SwmSnippet path="/models/Category.js" line="4">

---

The Category schema defines the structure of the Category documents in the database. It ensures that each category has a name, which is a required and unique field.

```
/**
 * Category Schema defines the structure of the Category documents in the database.
 *
 * @typedef {Object} Category
 * @property {String} name - The name of the category. It is a required and unique field.
 */
const CategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

CategorySchema.plugin(Validator);

```

---

</SwmSnippet>

# Unique and required constraints

The <SwmToken path="/models/Category.js" pos="8:10:10" line-data=" * @property {String} name - The name of the category. It is a required and unique field.">`name`</SwmToken> field is marked as <SwmToken path="/models/Category.js" pos="8:31:31" line-data=" * @property {String} name - The name of the category. It is a required and unique field.">`required`</SwmToken> and <SwmToken path="/models/Category.js" pos="8:35:35" line-data=" * @property {String} name - The name of the category. It is a required and unique field.">`unique`</SwmToken>. This ensures that every category must have a name and that no two categories can have the same name. This is crucial for maintaining data integrity and preventing duplicate entries.

# Validator plugin

The <SwmToken path="/models/Category.js" pos="14:4:4" line-data="CategorySchema.plugin(Validator);">`Validator`</SwmToken> plugin is added to the schema to enforce additional validation rules. This helps in maintaining the consistency and correctness of the data stored in the database.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
