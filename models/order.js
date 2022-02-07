const mongoose = require("mongoose");
const db = require("./db");

const { Schema, model } = mongoose;

const OrderItemSchema = new Schema(
  {
    created: { type: Date, default: Date.now },
    unitPrice: { type: Schema.Types.Decimal128, default: 0.0 },
    qty: { type: Number, default: 0 },
  },
  { strict: false }
);

const OrderSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    created: { type: Date, default: Date.now },
    items: [OrderItemSchema],
    note: String,
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { strict: false }
);

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
