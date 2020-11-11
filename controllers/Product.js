var MongoClient = require("mongodb").MongoClient;

const { testDatabaseUrl, databaseName } = require("../config");
const { createProduct } = require("../models/Product");

async function getProducts(req, res, query, limit) {
  MongoClient.connect(
    testDatabaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err, db) => {
      if (err) throw err;
      var dbo = db.db(databaseName);
      dbo
        .collection("Product")
        .find(query)
        .sort({ name: 1 })
        .limit(limit)
        .toArray((err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            res.json(results);
          } else {
            res.json({ msg: "No results found." });
          }
          db.close();
        });
    }
  );
}

async function submitProduct(req, res, name, price, desc, thumbnail) {
  MongoClient.connect(
    testDatabaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      var dbo = db.db(databaseName);
      var newProduct = createProduct(name, price, desc, thumbnail);
      dbo.collection("Product").insertOne(newProduct, function (err) {
        if (err) throw err;
        res.send({ msg: "Product was added." });
        db.close();
      });
    }
  );
}
module.exports = { getProducts, submitProduct };
