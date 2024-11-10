const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./routers/User');
const CustomerRouter = require('./routers/Customer');
const AlertRouter = require('./routers/Restock_alert');
const SaleRouter = require('./routers/Sale');
const ProductRouter = require('./routers/Product');
const CategoryRouter = require('./routers/Category');


mongoose.connect(`mongodb://127.0.0.1:27017/testRetail`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



const app = express();

app.use(express.json());

app.use(cors());


app.use('/api/users', UserRouter);
app.use('/api/sales', SaleRouter);
app.use('/api/products', ProductRouter);
app.use('/api/customers', CustomerRouter);
app.use('/api/alerts', AlertRouter);
app.use('/api/categories', CategoryRouter );


module.exports = app;