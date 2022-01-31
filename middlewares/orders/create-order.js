const nodemailer = require("nodemailer");

const User = require("../../models/user");
const Order = require("../../models/order");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

const createOrder = (req, res, next) => {
  if (req.body) {
    User.findById({ _id: req.body.clientId }, async function (err, user) {
      if (user) {
        const newOrder = new Order({
          client: user,
          items: req.body.items,
        });

        await newOrder.save().then((savedOrder) => {
          transporter.sendMail(
            {
              from: "",
              to: user.emailAddress,
              subject: "Easee wash - Your new order",
              text: "Please make sure payment is made for us to pickup your load",
            },
            function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Order created email sent: " + info.response);
                res.send(savedOrder);
              }
            }
          );
          res.send(savedOrder);
        });
      }
      if (!user) {
        res.status(401).send({ message: "Customer is not found." });
      }
      if (err) res.status(500).send({ message: "Failed finding customer" });
    });
  }
};

module.exports = createOrder;
