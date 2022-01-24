const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post("/register/", jsonParser, async function (req, res) {
  if (req.body) {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailAddress: req.body.email_address,
      mobileNumber: req.body.mobile_number,
      password: req.body.password,
    });
    await user.save().then((savedUser) => {
      res.send(savedUser);
    });
  }
});

router.post("/login", jsonParser, function (req, res) {
  const { username } = req.body;
  const query = User.where({ emailAddress: username });
  query.findOne(function (err, user) {
    if (err)
      res
        .status(500)
        .send({ message: "failed login, please check your login details" });
    if (user) {
      res.send(user);
    }
    if (!user) {
      res.status(401).send({ message: "User is not found." });
    }
  });
});

module.exports = router;
