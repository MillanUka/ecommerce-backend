const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("./middleware/passport");
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 5000;



const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 3600000, secure: false },
  proxy: true,
  store: new MongoStore({url : require("./config").testDatabaseUrl})
}));

app.use(passport.initialize());
app.use(passport.session());

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

app.use("/api/v1", router);


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
