---
title: User Controller
---
# Introduction

This document will walk you through the implementation of the User Controller feature.

The feature provides CRUD operations for user management in the application.

We will cover:

1. Retrieving all users.
2. Retrieving a specific user by ID.
3. Creating a new user.
4. Updating an existing user.
5. Deleting a user by ID.

# Retrieving all users

<SwmSnippet path="/controllers/User.js" line="4">

---

The `GetAllUsers` function retrieves all users from the database and sends them as a JSON response. This is useful for listing all users in the system.

```
/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all users or an error message.
 */
exports.GetAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json(error));
};
```

---

</SwmSnippet>

# Retrieving a specific user by ID

<SwmSnippet path="/controllers/User.js" line="18">

---

The `GetOneUser` function retrieves a user by their ID from the database. This is useful for fetching details of a specific user.

```
/**
 * Retrieves a specific user by their ID.
 *
 * @param {Object} req - Express request object, containing the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the user or an error message.
 */
exports.GetOneUser = (req, res, next) => {

    const id = req.params.id;
    User.findById(id)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error));
};
```

---

</SwmSnippet>

# Creating a new user

<SwmSnippet path="/controllers/User.js" line="34">

---

The `CreateUser` function creates a new user with a hashed password and saves it to the database. This ensures that passwords are stored securely.

```
/**
 * Creates a new user with hashed password and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the user data (email, password, name, role) in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.CreateUser = (req, res, next) => {
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="43">

---

The password is hashed using bcrypt before saving the user to the database.

```

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                role: req.body.role
            });
            user.save()
                .then(()=>res.status(201).json({message: 'User saved successfully.'}))
                .catch(error => res.status(400).json(error));
        })
```

---

</SwmSnippet>

<SwmSnippet path="/controllers/User.js" line="56">

---

The function ends here.

```


};
```

---

</SwmSnippet>

# Updating an existing user

<SwmSnippet path="/controllers/User.js" line="60">

---

The `UpdateUser` function updates an existing user's details by their ID. This is useful for modifying user information.

```
/**
 * Updates an existing user by their ID.
 *
 * @param {Object} req - Express request object, containing the updated user data in the body and the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.UpdateUser = (req, res, next) => {

    User.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'User updated successfully.'}))
        .catch(error => res.status(400).json(error));
};
```

---

</SwmSnippet>

# Deleting a user by ID

<SwmSnippet path="/controllers/User.js" line="76">

---

The `DeleteUser` function deletes a user by their ID from the database. This is useful for removing users from the system.

```
/**
 * Deletes a user by their ID.
 *
 * @param {Object} req - Express request object, containing the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.DeleteUser = (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'User deleted successfully.'}))
        .catch(error => res.status(400).json(error));
};
```

---

</SwmSnippet>

This concludes the walkthrough of the User Controller feature. Each function is designed to handle specific CRUD operations for user management.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
