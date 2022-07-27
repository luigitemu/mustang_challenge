const express = require("express");
const app = express();
const port = 3000;
const {getProfit} = require('./controller/profit');


// routes 
app.get('/', getProfit );


app.listen(port, err => {
    if (err) {
        console.error("Error: ", err);
        return;
    }
    console.log(`Listening on port :${port}`);
});