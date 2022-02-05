const app = require("./app");
require("dotenv").config();
const config = require("./config");

const {
  app: { host, port },
} = config();

app.listen(port, () => {
  console.log(`Easy wash app listening at http://${host}:${port}`);
});
