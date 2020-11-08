const express = require("express");
const router = express.Router();
const { getAllProducts, getProducts, submitProduct } = require("../controllers/Database");
router.get("/", (req, res) => {
  getAllProducts(req, res);
});

router.get("/limit/:limit", (req, res) => {
  getProducts(req, res, (Number)(req.params.limit));
});

router.post("/submit/:name/:price/:desc", (req, res) => {
  submitProduct(req, res, req.params.name, req.params.price, req.params.desc);
})

module.exports = router;
