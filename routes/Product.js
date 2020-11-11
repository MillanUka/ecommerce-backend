const express = require("express");
const router = express.Router();
const { getProducts, submitProduct } = require("../controllers/Product");

router.get("/", (req, res) => {
  var limit = Number(req.query.limit);
  var searchQuery = new RegExp(req.query.query, "i");
  var query = {name: searchQuery, desc: searchQuery};
  getProducts(req, res, query, limit);
});

router.post("/submit/", (req, res) => {
  submitProduct(req, res, req.query.name, req.query.price, req.query.desc, req.query.thumbnail);
});

module.exports = router;
