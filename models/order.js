const mongoose = require("mongoose");
const db = require("./db");

const { Schema, model } = mongoose;

const orderItemSchema = new Schema(
  {
    name: { type: String, unique: true },
    created: { type: Date, default: Date.now },
    unitPrice: { type: Schema.Types.Decimal128 },
    description: String,
    quantity: { type: Number, default: 0 },
  },
  { strict: false }
);

const orderSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    created: { type: Date, default: Date.now },
    items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
    isPaid: Boolean,
    note: String,
  },
  { strict: false }
);

const OrderModel = model("Order", orderSchema);
const OrderItemModel = model("OrderItem", orderItemSchema);

module.exports = { OrderModel, OrderItemModel };
