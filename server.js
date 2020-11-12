const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("./middleware/passport");

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("../frontend/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

var router = express.Router();
router.use("/product", require("./routes/Product"));
router.use("/user", require("./routes/User"));
router.use("/auth", require("./routes/Auth"));
//app.use(express.bodyParser());
app.use("/api/v1", router);

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
