const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;
const userRoute = require("./routes/account");
const catalogRoute = require("./routes/catalog");

app.use(cors());

app.use("/account", userRoute);

app.use("/catalog", catalogRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
