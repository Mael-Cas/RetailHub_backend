---
title: Category router
---
# Introduction

This document will walk you through the implementation of the category route feature.

The feature introduces new routes for handling category-related operations in the application.

We will cover:

1. How the routes are defined.
2. What each route does.
3. Why these routes are necessary.

# Defining the routes

We start by defining the routes in <SwmPath>[routers/Category.js](/routers/Category.js)</SwmPath>. These routes will handle different HTTP methods for category operations.

# Get all categories

<SwmSnippet path="/routers/Category.js" line="6">

---

The first route handles GET requests to fetch all categories.

```
router.get('/', CategoryCtrl.GetAllCategories);
```

---

</SwmSnippet>

# Create a new category

<SwmSnippet path="/routers/Category.js" line="7">

---

The second route handles POST requests to create a new category.

```
router.post('/', CategoryCtrl.CreateCategory);
```

---

</SwmSnippet>

# Delete a category

<SwmSnippet path="/routers/Category.js" line="8">

---

The third route handles DELETE requests to remove a category by its ID.

```
router.delete('/:id', CategoryCtrl.DeleteCategory);
```

---

</SwmSnippet>

# Conclusion

These routes are necessary to provide a structured way to manage categories through the API. Each route corresponds to a specific CRUD operation, making the code modular and easier to maintain.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
