const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const users = [];
// create application/json parser
const jsonParser = bodyParser.json();

router.post("/register/", jsonParser, function (req, res) {
  if (req.body) {
    const newUserId = uuidv4();
    users.push({ ...req.body, id: newUserId });
    res.send(users.find(({ id }) => id === newUserId));
  }
});

router.post("/login", jsonParser, function (req, res) {
  const { username, password } = req.body;
  if (
    users.find(
      (user) => user.email_address === username && user.password === password
    )
  ) {
    res.send(
      users.find(
        (user) => user.email_address === username && user.password === password
      )
    );
  }
  res
    .status(500)
    .send({ message: "failed login, please check your login details" });
});

router.get("/user/:userId/", function (req, res) {
  if (req.params.userId) {
    res.json(users.find((user) => user.id === parseInt(req.params.userId)));
  } else {
    res.status(401).send({ message: "User is not found" });
  }
});

module.exports = router;
