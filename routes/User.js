const express = require("express");
const router = express.Router();
const { isAuthenticated, getUserById } = require("../controllers/User");
router.get("/", (req, res) => {});

router.get("/:id", isAuthenticated, async (req, res) => {
  var user = await getUserById(req.body.id);
  console.log(user)
  if (user) {
    res.send(user);
  } else {
    res.send({ msg: "User was not found!" });
  }
});

module.exports = router;
