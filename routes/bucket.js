const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

const Product = require("../models/product");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.use(jsonParser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("uploaded_file"),
  async function (req, res) {
    fs.readFile(
      `./public/data/uploads/${req.file.originalname}`,
      "base64",
      async (err, base64Image) => {
        if (err) {
          res.status(401).send({ message: "Failed reading file" });
        }
        const newProduct = new Product({
          ...req.body,
          img: {
            name: req.file.originalname,
            contentType: req.file.mimetype,
            dataUrl: `data:${req.file.mimetype};base64, ${base64Image}`,
          },
        });
        await newProduct.save().then((savedProduct) => {
          res.send(savedProduct);
        });
      }
    );
  }
);

module.exports = router;
