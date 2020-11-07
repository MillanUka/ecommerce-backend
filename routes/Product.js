const express = require("express");
const router = express.Router();
const createProduct = require("../models/Product").createProduct;
router.get("/", (req, res) => {
  var product1 = createProduct(1, "test", 2.5, "This is a test desc");
  var product2 = createProduct(2, "test2", 5.5, "This is a test desc");
  var products = [product1, product2];
  return res.send(JSON.stringify(products));
});

module.exports = router;
