const express = require("express");
const router = express.Router();
const { submitUser, getUserByEmail, encryptPassword } = require("../controllers/User");
const passport = require("../middleware/passport");
router.post("/register/", async (req, res, next) => {
  var email = req.body.email;
  var password = await encryptPassword(req.body.password);
  console.log(email)
  var user = await getUserByEmail(email);
  var isUsernameExists = user === null;
  if (isUsernameExists) {
    submitUser(req, res, email, password);
  } else {
    res.send({ msg: "An account with that email already exists!" });
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
      res.status(401).json(info);
    }
  })(req, res, next);
});
module.exports = router;
