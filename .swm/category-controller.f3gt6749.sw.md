---
title: Category Controller
---
# Introduction

This document will walk you through the implementation of the Category Controller feature.

The feature provides CRUD operations for categories in the database.

We will cover:

1. Retrieving all categories.
2. Creating a new category.
3. Deleting a category by ID.

# Retrieving all categories

<SwmSnippet path="/controllers/Category.js" line="3">

---

The <SwmToken path="/controllers/Category.js" pos="10:2:2" line-data="exports.GetAllCategories =  (req, res) =&gt; {">`GetAllCategories`</SwmToken> function retrieves all categories from the database and sends them as a JSON response. This is essential for displaying all available categories to the user.

```
/**
 * Retrieves all categories from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with all categories or an error message.
 */
exports.GetAllCategories =  (req, res) => {
    Category.find()
        .then((data) => {res.status(200).json(data)})
        .catch((err) => {res.status(500).json(err)});
}
```

---

</SwmSnippet>

# Creating a new category

<SwmSnippet path="/controllers/Category.js" line="16">

---

The <SwmToken path="/controllers/Category.js" pos="23:2:2" line-data="exports.CreateCategory = (req, res) =&gt; {">`CreateCategory`</SwmToken> function creates a new category and saves it to the database. It ensures that the <SwmToken path="/controllers/Category.js" pos="24:7:7" line-data="    delete req.body._id;">`_id`</SwmToken> field is not included in the request body to avoid conflicts.

```
/**
 * Creates a new category and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the category data in the body.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with success message or an error message.
 */
exports.CreateCategory = (req, res) => {
    delete req.body._id;
    const newCategory = new Category({
        ...req.body,
    });
    newCategory.save()
        .then(() => res.status(201).json({message: 'Category saved successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
}
```

---

</SwmSnippet>

# Deleting a category by ID

<SwmSnippet path="/controllers/Category.js" line="33">

---

The <SwmToken path="/controllers/Category.js" pos="40:2:2" line-data="exports.DeleteCategory = (req, res) =&gt; {">`DeleteCategory`</SwmToken> function deletes a category from the database by its ID. It sends a success message if the deletion is successful or an error message if it fails.

```
/**
 * Deletes a category from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the category ID in the parameters.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with success message or an error message.
 */
exports.DeleteCategory = (req, res) => {
    const id = req.params.id;
    Category.deleteOne({ _id: id })
        .then(() => res.status(204).json({message: 'Category deleted successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
}
```

---

</SwmSnippet>

This concludes the walkthrough of the Category Controller feature. Each function is designed to handle specific CRUD operations, ensuring that categories can be managed effectively in the database.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
