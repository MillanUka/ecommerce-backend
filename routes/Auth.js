const express = require("express");
const router = express.Router();
const { submitUser, checkUsernameExists, encryptPassword } = require("../controllers/User");

router.post("/register/", async (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = await encryptPassword(req.body.password);
  
    var searchQuery = new RegExp(username, "i");
    var query = { username: searchQuery };
    var isUsernameExists = await checkUsernameExists(query);
    console.log(req);
    if (isUsernameExists) {
        //submitUser(req, res, username, email, password);
    } else {
      res.send({ msg: "This username already exists!" });
    }
  });

  module.exports = router;