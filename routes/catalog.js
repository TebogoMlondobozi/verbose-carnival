const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const catalog = [
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
  {
    id: uuidv4(),
    name: "Denim shirt",
    description: "made of quality jean",
    cost: "R100 - R350",
    thumbnail: "image/thumbnail",
  },
];

// create application/json parser
const jsonParser = bodyParser.json();

router.get("/products", jsonParser, function (req, res) {
  res.json({ catalog: catalog });
});

router.get("/product/:productId/", jsonParser, function (req, res) {
  if (req.params.productId) {
    res.json(
      catalog.find((product) => product.id === parseInt(req.params.productId))
    );
  } else {
    res.status(401).send({ message: "Product is not found" });
  }
});

module.exports = router;
