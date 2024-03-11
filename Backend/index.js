require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const router = require("./routes/index");
const path = require("path");

app.use(cors());

app.use(express.json());
dbConnection();
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(8000, function () {
    console.log("Server is running");
});
