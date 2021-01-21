const express = require("express");
const router = express.Router();
const { getProducts, submitProduct } = require("../controllers/Product");

router.get("/", (req, res) => {
  var limit = Number(req.query.limit);
  var searchQuery = new RegExp(req.query.query, "i");
  if(limit === null) {
    limit = 10;
  }
  var query = { name: searchQuery, desc: searchQuery };
  getProducts(req, res, query, limit);
});

router.post("/submit/", (req, res) => {
  submitProduct(
    req,
    res,
    req.body.name,
    req.body.price,
    req.body.desc,
    req.body.thumbnail,
    req.body.submitter
  );
});

module.exports = router;
