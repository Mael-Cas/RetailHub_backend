---
title: Server
---
# Introduction

This document will walk you through the implementation of the server setup feature.

The feature sets up a server, normalizes the port, handles errors, and logs the server's listening status.

We will cover:

1. How the port is normalized.
2. How the server is created.
3. How errors are handled.
4. How the server's listening status is logged.

# Port normalization

<SwmSnippet path="/server.js" line="7">

---

We need to normalize the port to ensure it is a valid number, string, or false. This helps in avoiding invalid port values which can cause the server to fail.

```
/**
 * Normalize a port into a number, string, or false.
 * @param {string} val - The value to normalize.
 * @returns {number|string|boolean} - Returns the normalized port value.
 */
const normalizePort = val => {
    const port = parseInt(val, 10);
```

---

</SwmSnippet>

<SwmSnippet path="/server.js" line="14">

---

The function checks if the port is a number and if it is non-negative. If not, it returns the original value or false.

```

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '10011');
app.set('port', port);
```

---

</SwmSnippet>

# Server creation

<SwmSnippet path="/server.js" line="53">

---

We create the server using the <SwmToken path="/server.js" pos="53:6:8" line-data="const server = http.createServer(app);">`http.createServer`</SwmToken> method, passing the Express app as an argument. This binds the app to the server.

```
const server = http.createServer(app);
```

---

</SwmSnippet>

# Error handling

<SwmSnippet path="/server.js" line="55">

---

We attach an error handler to the server to manage any errors that occur during server operation. This ensures that errors are caught and handled appropriately.

```
server.on('error', errorHandler);
```

---

</SwmSnippet>

# Logging server status

<SwmSnippet path="/server.js" line="56">

---

We log the server's listening status to know when the server is up and running. This logs the address and port the server is listening on.

```
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

```

---

</SwmSnippet>

This setup ensures that the server is properly configured, errors are managed, and the server status is logged for monitoring.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
