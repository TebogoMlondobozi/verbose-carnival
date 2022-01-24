const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://127.0.0.1:27017/eazywash-db")
  .then(() => console.log("connection established"))
  .catch((e) => console.log("Failed database connection", e));

module.exports = db;
