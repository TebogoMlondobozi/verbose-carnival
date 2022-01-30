const mongoose = require("mongoose");
const db = require("./db");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    emailAddress: { type: String, unique: true },
    mobileNumber: String,
    password: String,
    timestamp: { type: Date, default: Date.now },
  },
  { strict: false }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
