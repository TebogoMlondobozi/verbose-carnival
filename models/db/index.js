const mongoose = require("mongoose");
const config = require("../../config");

const {
  db: { port, url },
} = config();

const db = mongoose
  .connect(url)
  .then(() => console.log("connection established, listening to port", port))
  .catch((e) => console.log("Failed database connection", e));

module.exports = db;
