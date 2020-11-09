var MongoClient = require("mongodb").MongoClient;

const { testDatabaseUrl, databaseName } = require("../config");
const { createProduct } = require("../models/Product");

async function getProducts(req, res, query, limit) {
  MongoClient.connect(testDatabaseUrl, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo
      .collection("Product")
      .find(query)
      .sort({ name: 1 })
      .limit(limit)
      .toArray(function (err, results) {
        if (err) throw err;
        if (results.length > 0) {
          res.json(results);
        } else {
          res.json({msg : "No results found."});
        }
        db.close();
      });
  });
}

async function submitProduct(req, res, name, price, desc) {
  MongoClient.connect(testDatabaseUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    var newProduct = createProduct(name, price, desc);
    dbo.collection("Product").insertOne(newProduct, function (err) {
      if (err) throw err;
      res.send({ msg: "inserted" });
      db.close();
    });
  });
}
module.exports = { getProducts, submitProduct };
