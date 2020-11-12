const express = require("express");
const router = express.Router();
const { submitUser, getUser, encryptPassword } = require("../controllers/User");
const passport = require("../middleware/passport");
router.post("/register/", async (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = await encryptPassword(req.body.password);

  var user = await getUser(username);
  var isUsernameExists = user === null;
  if (isUsernameExists) {
    submitUser(req, res, username, email, password);
  } else {
    res.send({ msg: "This username already exists!" });
  }
});

router.post("/login/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(401).json(err);
    }
    if (user) {
      user.password = null;
      return res.status(200).json(user)
    } else {
      res.status(401).json({msg : "Unsuccessful login!"});
    }
  })(req, res, next);
});
module.exports = router;
