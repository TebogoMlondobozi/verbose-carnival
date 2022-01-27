const express = require("express");
const bodyParser = require("body-parser");
const Order = require("../models/order");
const User = require("../models/user");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post("/create/", jsonParser, async function (req, res) {
  if (req.body) {
    User.findById(req.body.clientId, async function (err, user) {
      if (user) {
        const newOrder = new Order({
          client: user,
          items: req.body.items,
        });

        await newOrder.save().then((savedOrder) => {
          res.send(savedOrder);
        });
      }
      if (!user) {
        res.status(401).send({ message: "Customer is not found." });
      }
      if (err) res.status(500).send({ message: "Failed finding customer" });
    });
  }
});

router.get("/:orderId/", function (req, res) {
  Order.findById(req.params.orderId, function (err, order) {
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
