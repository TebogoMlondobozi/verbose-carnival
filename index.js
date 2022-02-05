const app = require("./app");
require("dotenv").config();
const config = require("./config");

const {
  app: { host, port },
} = config(process.env.NODE_ENV);

app.listen(port, () => {
  console.log("---", process.env.NODE_ENV, config(process.env.NODE_ENV));
  console.log(`Easy wash app listening at http://${host}:${port}`);
});
