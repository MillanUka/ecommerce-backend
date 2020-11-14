const express = require("express");
const router = express.Router();
const {
  submitUser,
  getUserByEmail,
  encryptPassword,
  isAuthenticated,
} = require("../controllers/User");
const passport = require("../middleware/passport");
router.post("/register/", async (req, res, next) => {
  var email = req.body.email;
  var password = await encryptPassword(req.body.password);
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
      req.logIn(user, function(err) {
        if (err) return next(err);
    
      user.password = null;
      return res.status(200).json(user);
      })
    } 
    else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get("/check/", isAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.status(200).json({ msg: "User is authenticated" });
});

module.exports = router;
