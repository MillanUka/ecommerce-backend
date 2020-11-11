const express = require("express");
const router = express.Router();
const { createUser } = require("../models/User");
router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/submit/", (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var user = createUser(username, email, password);
});

module.exports = router;
