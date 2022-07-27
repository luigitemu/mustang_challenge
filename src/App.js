const express = require("express");
const { getProfit } = require("./controller/profit");
const app = express();

 
// routes 
app.get('/', getProfit );

module.exports = app;
