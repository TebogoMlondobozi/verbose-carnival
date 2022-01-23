const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/eazywash-db")
  .then(() => console.log("connection established"));

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  emailAddress: String,
  mobileNumber: String,
  password: String,
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
