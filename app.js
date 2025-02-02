const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./routers/User');
const CustomerRouter = require('./routers/Customer');
const AlertRouter = require('./routers/Restock_alert');
const SaleRouter = require('./routers/Sale');
const ProductRouter = require('./routers/Product');
const CategoryRouter = require('./routers/Category');
const AddressRouter = require('./routers/Address');
const RoleRouter = require('./routers/Role');
const StoreRouter = require('./routers/Store');
const StoreProductRouter = require('./routers/StoreProduct');


mongoose.connect(`mongodb://${process.env.DB_HOST}/testRetail`)
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
app.use('/api/address', AddressRouter);
app.use('/api/roles', RoleRouter);
app.use('/api/stores', StoreRouter);
app.use('/api/store/products', StoreProductRouter);

module.exports = app;