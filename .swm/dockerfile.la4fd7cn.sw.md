---
title: Dockerfile
---
# Introduction

This document will walk you through the implementation of the <SwmPath>[Dockerfile](/Dockerfile)</SwmPath> for our project.

The <SwmPath>[Dockerfile](/Dockerfile)</SwmPath> sets up the environment for running our Node.js application in a Docker container.

We will cover:

1. The base image selection.
2. Setting up the working directory and copying project files.
3. Installing dependencies and exposing the application port.
4. Defining the command to start the application.

# Base image selection

<SwmSnippet path="/Dockerfile" line="1">

---

We start by selecting a base image that includes Node.js. This ensures that our container has the necessary runtime environment for our application.

```
# Utiliser une image de base avec Node.js
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY package*.json ./
```

---

</SwmSnippet>

# Setting up the working directory and copying project files

<SwmSnippet path="/Dockerfile" line="1">

---

Next, we create a working directory inside the container and copy the project's package files. This is essential for managing dependencies.

```
# Utiliser une image de base avec Node.js
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY package*.json ./
```

---

</SwmSnippet>

# Installing dependencies and exposing the application port

<SwmSnippet path="/Dockerfile" line="9">

---

We then install the project dependencies using npm and copy the rest of the project files into the container. Finally, we expose the port on which our application will run.

```

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port sur lequel votre application s'exécute
EXPOSE 10011
```

---

</SwmSnippet>

# Defining the command to start the application

<SwmSnippet path="/Dockerfile" line="18">

---

Lastly, we define the command to start our Node.js application. This tells Docker how to run our application when the container starts.

```

# Commande pour démarrer votre application
CMD ["node", "server.js"]
```

---

</SwmSnippet>

This setup ensures that our Node.js application is properly containerized and ready to run in any environment that supports Docker.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBUmV0YWlsSHViJTNBJTNBTWFlbC1DYXM=" repo-name="RetailHub"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
