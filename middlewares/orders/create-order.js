const User = require("../../models/user");
const Order = require("../../models/order");
const sendEmail = require("../../app/utils/email-config");

const createOrder = (req, res, next) => {
  if (req.body) {
    User.findById({ _id: req.body.clientId }, async function (err, user) {
      if (user) {
        const newOrder = new Order({
          client: user,
          items: req.body.items,
        });

        await newOrder.save().then((savedOrder) => {
          sendEmail({
            to: user.emailAddress,
            subject: "Easee wash - Your new order",
            text: "Please make sure payment is made for us to pickup your load",
          });
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
