const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

const Product = require("../models/product");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.use(jsonParser);

const upload = multer({
  dest: "./public/data/uploads/",
  rename: (fieldname, filename) => filename,
});

router.post(
  "/upload",
  upload.single("uploaded_file"),
  async function (req, res) {
    const newProduct = new Product({
      ...req.body,
      img: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
    });

    await newProduct.save().then((savedProduct) => {
      res.send(savedProduct);
    });
  }
);

module.exports = router;
