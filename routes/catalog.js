const express = require("express");
const bodyParser = require("body-parser");

const Product = require("../models/product");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.get("/products", jsonParser, async function (req, res) {
  const products = await Product.find({});
  res.json({ catalog: products });
});

router.get("/product/:productId/", jsonParser, function (req, res) {
  Product.findById(req.params.productId, function (err, product) {
    if (product) {
      res.send(product);
    }
    if (!product) {
      res.status(401).send({ message: "Product is not found." });
    }
    if (err) res.status(500).send({ message: "Failed finding product" });
  });
});

module.exports = router;
