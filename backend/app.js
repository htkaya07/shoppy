const express = require("express");
const app = express();
// const bodyParser=require('body-parser')
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt=require('./helpers/jwt')
const errorHandler=require('./helpers/error-handler')

app.use(cors());
app.options("*", cors());

//middleware
// app.use(bodyParser.json);
app.use(express.json());
app.use(morgan("tiny"));
app.use((authJwt));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
// const errorHandler = require("./helpers/error-handler");
// const authJwt = require("./helpers/jwt");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


module.exports = app;