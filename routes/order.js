const express = require("express");
const bodyParser = require("body-parser");
const Order = require("../models/order");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post("/create/", jsonParser, async function (req, res) {
  // if (req.body) {

  // const user = new Order({
  //   client: req.body.clientId,
  //   lastname: req.body.lastname,
  //   emailAddress: req.body.email_address,
  //   mobileNumber: req.body.mobile_number,
  //   password: req.body.password,
  // });
  // await user.save().then((savedUser) => {
  //   res.send(savedUser);
  // });
  // }

  if (req.body) {
    console.log("----", req.body);
    res.send({ message: "Order created" });
  }
});

module.exports = router;
