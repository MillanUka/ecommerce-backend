var MongoClient = require("mongodb").MongoClient;

const { testDatabaseUrl, databaseName } = require("../config");
const { createUser } = require("../models/User");

async function submitUser(req, res, username, email, password) {
    MongoClient.connect(
      testDatabaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var newProduct = createUser(username, email, password);
        dbo.collection("User").insertOne(newProduct, function (err) {
          if (err) throw err;
          res.send({ msg: "Created new User." });
          db.close();
        });
      }
    );
  }

  module.exports = { submitUser };