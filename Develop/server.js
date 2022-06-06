const routes = require("./routes");

const express = require("express");
const Express = express();
Express.use(
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public"),
  "/",
  routes
);

const PORT = process.env.PORT || 3001;
Express.listen(PORT, () => {
  console.log(`Go to http://localhost ${PORT}`);
});
