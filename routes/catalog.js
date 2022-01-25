const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const Product = require("../models/product");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.get("/products", jsonParser, async function (req, res) {
  const products = await Product.find({});
  res.json({ catalog: products });
});

router.get("/product/:productId/", jsonParser, async function (req, res) {
  const query = Product.where({ _id: req.params.productId });
  await query.findOne(function (err, product) {
    if (err) res.status(500).send({ message: "Failed finding product" });
    if (product) {
      res.send(product);
    }
    if (!product) {
      res.status(401).send({ message: "Product is not found." });
    }
  });
});

module.exports = router;
