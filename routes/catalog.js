const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

require("../models/db");
const Product = require("../models/product");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.get("/products", jsonParser, async function (req, res) {
  const products = await Product.find({});
  res.json(products);
});

router.get("/product/:productId/", jsonParser, function (req, res) {
  Product.findById({ _id: req.params.productId }, function (err, product) {
    if (product) {
      res.send(product);
    }
    if (!product) {
      res.status(401).send({ message: "Product is not found." });
    }
    if (err) res.status(500).send({ message: "Failed finding product" });
  });
});

router.delete("/product/:productId", jsonParser, async function (req, res) {
  Product.findOneAndDelete({ _id: req.params.productId })
    .then((deletedProduct) => {
      fs.unlink(
        `./public/data/uploads/${deletedProduct.toObject().img.name}`,
        (err) => {
          if (err) throw err;
          console.log(
            `./public/data/uploads/${
              deletedProduct.toObject().img.name
            } was deleted`
          );
        }
      );
      if (deletedProduct) {
        res.json({ message: "Successfully deleted product", success: true });
      }
    })
    .catch((error) => {
      console.log("Failed deleting product", error);
      res
        .status(400)
        .send({ message: "Failed deleting product", failed: true });
    });
});

module.exports = router;
