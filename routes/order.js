const express = require("express");
const bodyParser = require("body-parser");

const Order = require("../models/order");

const createOrder = require("../middlewares/orders/create-order");
const UserModel = require("../models/user");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post(
  "/create/",
  [jsonParser, createOrder],
  async function (req, res) {}
);

router.put(
  "/update/:orderId/user/:userId",
  jsonParser,
  async function (req, res) {
    UserModel.findById({ _id: req.params.userId })
      .then((user) => {
        const { firstname, lastname } = user;
        Order.findByIdAndUpdate(
          { _id: req.params.orderId },
          {
            items: req.body,
            note: `${firstname} ${lastname} updated the order on ${Date.now()}`,
          }
        )
          .then(() => {
            res.send({
              message: "Successfully updated order",
              status: true,
              _id: req.params.orderId,
            });
          })
          .catch((error) => {
            console.log("1. Failed order update", error);
            res
              .status(400)
              .send({ message: "Failed updating order", status: false });
          });
      })
      .catch((error) => {
        console.log("Failed finding user..", error);
        res.status(400).send({ message: "Failed finding user" });
      });
  }
);

router.get("/:orderId/user/:userId", function (req, res) {
  Order.findById({ _id: req.params.orderId })
    .then((order) => {
      if (order && order.client.toString() === req.params.userId) {
        res.send(order);
      } else {
        res.send(undefined);
      }
    })
    .catch((error) => {
      res.status(401).send({ message: "Order is not found.", error });
    });
});

router.get("/recentOrders/:userId", function (req, res) {
  Order.find({ client: req.params.userId })
    .limit(10)
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      res.status(401).send({ message: "Orders are not found.", error });
    });
});

module.exports = router;
