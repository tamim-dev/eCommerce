require('dotenv').config()
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConfig")
const router = require("./routes/index")


app.use(express.json());
dbConnection()
app.use(router)


app.listen(8000, function () {
    console.log("Server is running");
});


