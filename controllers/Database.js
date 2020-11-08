var MongoClient = require("mongodb").MongoClient;

const { testDatabaseUrl, databaseName } = require("../config");
const { createProduct } = require("../models/Product")
async function getAllProducts(req, res) {
    getProducts(req, res, 0);
}

async function getProducts(req, res, limit) {
  MongoClient.connect(testDatabaseUrl, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo
      .collection("Product")
      .find({})
      .limit(limit)
      .toArray(function (err, results) {
        if (err) throw err;
        res.json(results);
        db.close();
      });
  });
}

async function submitProduct(req, res, name, price, desc) {
    MongoClient.connect(testDatabaseUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var newProduct = createProduct(name, price, desc);
        dbo.collection("Product").insertOne(newProduct, function(err) {
          if (err) throw err;
          res.send({msg : "inserted"});
          db.close();
        });
      });
}
module.exports = { getAllProducts, getProducts, submitProduct };
