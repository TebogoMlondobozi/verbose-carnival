const mongoose = require("mongoose");
const db = require("./db");

const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
  {
    created: { type: Date, default: Date.now() },
    description: String,
    charge: { type: Schema.Types.Decimal128 },
    paymentMethod: { type: String, required: true },
    paymentStatus: String,
    order: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
  },
  { strict: false }
);

const PaymentModel = model("Payment", PaymentSchema);

module.exports = PaymentModel;
