const express = require("express");
const router = express.Router();
const { submitUser, checkUsernameExists } = require("../controllers/User");
router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/create/", async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var searchQuery = new RegExp(username, "i");
  var query = { username: searchQuery };
  var isUsernameExists = await checkUsernameExists(query);
  console.log(isUsernameExists);

  if (isUsernameExists) {
    submitUser(req, res, username, email, password);
  } else {
    res.send({ msg: "This username already exists!" });
  }
});

module.exports = router;
