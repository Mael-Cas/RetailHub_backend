---
title: Application
---
# Introduction

This document will walk you through the implementation of the application feature.

The feature sets up the main application server, connects to the database, and configures various middleware and routes.

We will cover:

1. Database connection setup.
2. Express application initialization.
3. Middleware configuration.
4. Route setup.

# Database connection setup

<SwmSnippet path="/app.js" line="12">

---

We start by connecting to the <SwmToken path="/app.js" pos="12:5:5" line-data="mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/decathlon`)">`mongodb`</SwmToken> database using Mongoose. This is crucial for data persistence and retrieval.

```
mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/decathlon`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

```

---

</SwmSnippet>

# Express application initialization

<SwmSnippet path="/app.js" line="18">

---

Next, we initialize the Express application. This sets up the main server instance.

```
const app = express();

```

---

</SwmSnippet>

# Middleware configuration

<SwmSnippet path="/app.js" line="20">

---

We configure essential middleware for the application. This includes JSON parsing and enabling CORS.

```
app.use(express.json());
```

---

</SwmSnippet>

<SwmSnippet path="/app.js" line="22">

---

```
app.use(cors());
```

---

</SwmSnippet>

# Route setup

<SwmSnippet path="/app.js" line="25">

---

Finally, we set up the routes for different resources. Each route is associated with a specific router that handles the respective resource's endpoints.

```
app.use('/api/users', UserRouter);
app.use('/api/sales', SaleRouter);
app.use('/api/products', ProductRouter);
app.use('/api/customers', CustomerRouter);
app.use('/api/alerts', AlertRouter);
app.use('/api/categories', CategoryRouter );
```

---

</SwmSnippet>

This setup ensures that the application is modular and each resource is managed by its own router.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
