---
title: User router
---
# Introduction

This document will walk you through the implementation of the user router feature.

The feature introduces a set of routes for handling user-related operations in the application.

We will cover:

1. How the routes are defined.
2. The purpose of each route.
3. How these routes fit into the overall application structure.

# Defining the routes

We define the routes in <SwmPath>[routers/User.js](/routers/User.js)</SwmPath>. Each route corresponds to a specific user operation.

# Route for getting all users

<SwmSnippet path="/routers/User.js" line="9">

---

This route handles the retrieval of all users. It maps the GET request to the <SwmToken path="/routers/User.js" pos="9:11:11" line-data="router.get(&#39;/&#39;, UserCtrl.GetAllUsers);">`GetAllUsers`</SwmToken> controller method.

```
router.get('/', UserCtrl.GetAllUsers);
```

---

</SwmSnippet>

# Route for getting a single user

<SwmSnippet path="/routers/User.js" line="10">

---

This route handles the retrieval of a single user by their ID. It maps the GET request with a user ID parameter to the <SwmToken path="/routers/User.js" pos="10:12:12" line-data="router.get(&#39;/:id&#39;, UserCtrl.GetOneUser);">`GetOneUser`</SwmToken> controller method.

```
router.get('/:id', UserCtrl.GetOneUser);
```

---

</SwmSnippet>

# Route for creating a new user

<SwmSnippet path="/routers/User.js" line="11">

---

This route handles the creation of a new user. It maps the POST request to the <SwmToken path="/routers/User.js" pos="11:11:11" line-data="router.post(&#39;/&#39;, UserCtrl.CreateUser);">`CreateUser`</SwmToken> controller method.

```
router.post('/', UserCtrl.CreateUser);
```

---

</SwmSnippet>

# Route for updating a user

<SwmSnippet path="/routers/User.js" line="12">

---

This route handles updating an existing user by their ID. It maps the PUT request with a user ID parameter to the <SwmToken path="/routers/User.js" pos="12:12:12" line-data="router.put(&#39;/:id&#39;, UserCtrl.UpdateUser);">`UpdateUser`</SwmToken> controller method.

```
router.put('/:id', UserCtrl.UpdateUser);
```

---

</SwmSnippet>

# Route for deleting a user

<SwmSnippet path="/routers/User.js" line="13">

---

This route handles the deletion of a user by their ID. It maps the DELETE request with a user ID parameter to the <SwmToken path="/routers/User.js" pos="13:12:12" line-data="router.delete(&#39;/:id&#39;, UserCtrl.DeleteUser);">`DeleteUser`</SwmToken> controller method.

```
router.delete('/:id', UserCtrl.DeleteUser);
```

---

</SwmSnippet>

# Conclusion

The user router feature organizes user-related operations into distinct routes, each mapped to a specific controller method. This structure ensures that each operation is handled appropriately and keeps the codebase modular and maintainable.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
