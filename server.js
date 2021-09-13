/* global process */
require("./src/api/bootstrap");
const express = require("express");

const app = express();

// Register routes
require("./src/api/app-routes")(app);

app.use(
  "/gigs-app",
  express.static("./dist", {
    setHeaders: function setHeaders(res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    },
  })
);
app.get("/", function (req, res) {
  res.send("alive");
});

const PORT = process.env.PORT || 8010;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
