const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: String,
    category: { type: String, required: true },
    created: { type: Date, default: Date.now },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { strict: false }
);

const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
