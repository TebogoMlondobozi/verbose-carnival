const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;
const userRoute = require("./routes/account");
const catalogRoute = require("./routes/catalog");
const bucketRoute = require("./routes/bucket");
const ordersRoute = require("./routes/order");

app.use(cors());

app.use("/account", userRoute);

app.use("/catalog", catalogRoute);

app.use("/bucket", bucketRoute);

app.use("/order", ordersRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
