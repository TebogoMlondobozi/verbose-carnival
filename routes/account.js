const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
const Address = require("../models/address");

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
    await user
      .save()
      .then((savedUser) => {
        res.send({
          success: true,
          message: "Your account has been created successfully!",
          user: savedUser,
        });
      })
      .catch((error) => {
        console.log("Failed adding new user", error);
        res
          .status(400)
          .send({ success: false, message: "Failed creating user account" });
      });
  }
});

router.post("/login", jsonParser, async function (req, res) {
  const { username, password } = req.body;
  User.findOne({ emailAddress: username })
    .then((user) =>
      user.comparePassword(password, (passwordsMatched) =>
        passwordsMatched
          ? res.send({
              message: "Successfully logged in!",
              success: true,
              user,
            })
          : res.status(401).send({
              message: "Incorrect logins, please check your password.",
              success: false,
            })
      )
    )
    .catch((err) => {
      res.status(400).send({
        message: "Incorrect details, please check your username and password.",
        success: false,
      });
    });
});

router.post("/address/:userId", jsonParser, function (req, res) {
  User.findById({ _id: req.params.userId })
    .then(async (user) => {
      if (!user.addressId) {
        const newAddress = new Address({
          postal_code: req.body.postal_code,
          province: req.body.province,
          street_name: req.body.street_name,
          town_city: req.body.town_city,
          unit_complex_number: req.body.unit_complex_number,
        });

        await newAddress
          .save()
          .then((savedAddress) => {
            User.findByIdAndUpdate(
              { _id: req.params.userId },
              {
                addressId: savedAddress._id,
              },
              { new: true }
            )
              .then((updatedUser) => res.send(updatedUser))
              .catch((error) => {
                console.log("0. Failed updating user with new address", error);
                res.status(400).send({
                  message: error,
                });
              });
          })
          .catch((error) => {
            console.log("1. Failed updating user with new address", error);
            res.status(400).send({
              message: error,
            });
          });
      }
    })
    .catch((error) => {
      console.log("2. Failed finding a user", error);
      res.status(400).send({ message: "Failed creating user address" });
    });
});

router.get("/address/:userId", jsonParser, function (req, res) {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (user.addressId) {
        Address.findById({ _id: user.addressId })
          .then((userAddress) => res.send(userAddress))
          .catch((error) => {
            console.log("0. Failed fetching address from the database");
            res.status(400).send({ message: error });
          });
      } else {
        res.send({});
      }
    })
    .catch((error) => {
      console.log("1. Failed finding user from the database");
      res.status(400).send({ message: error });
    });
});

router.put("/address/:addressId", jsonParser, function (req, res) {
  Address.findByIdAndUpdate(
    { _id: req.params.addressId },
    {
      postal_code: req.body.postal_code,
      province: req.body.province,
      street_name: req.body.street_name,
      town_city: req.body.town_city,
      unit_complex_number: req.body.unit_complex_number,
    }
  )
    .then(() => {
      res.send({ message: "Successfully updated address", status: true });
    })
    .catch((error) => {
      console.log("1. Failed address update", error);
      res
        .status(400)
        .send({ message: "Failed updating address", status: false });
    });
});

module.exports = router;
