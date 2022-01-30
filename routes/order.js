const express = require("express");
const bodyParser = require("body-parser");

const Order = require("../models/order");

const createOrder = require("../middlewares/orders/create-order");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post(
  "/create/",
  [jsonParser, createOrder],
  async function (req, res) {}
);

router.get("/:orderId/", function (req, res) {
  Order.findById({ _id: req.params.orderId }, function (err, order) {
    if (order) {
      res.send(order);
    }
    if (!order) {
      res.status(401).send({ message: "Order is not found." });
    }
    if (err) res.status(500).send({ message: "Failed finding order" });
  });
});

module.exports = router;
