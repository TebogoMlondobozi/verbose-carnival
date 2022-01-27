const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("../routes/account");
const catalogRoute = require("../routes/catalog");
const bucketRoute = require("../routes/bucket");
const ordersRoute = require("../routes/order");

app.use(cors());

app.use("/account", userRoute);

app.use("/catalog", catalogRoute);

app.use("/bucket", bucketRoute);

app.use("/order", ordersRoute);

module.exports = app;
