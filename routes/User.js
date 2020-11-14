const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../controllers/User");
router.get("/", (req, res) => {});

router.get("/:id", isAuthenticated, (req, res) => {
    console.log(req.user_id);
});

module.exports = router;
