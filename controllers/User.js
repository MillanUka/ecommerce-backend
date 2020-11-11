var MongoClient = require("mongodb").MongoClient;

const { testDatabaseUrl, databaseName } = require("../config");
const { createUser } = require("../models/User");

async function submitUser(req, res, username, email, password) {
  MongoClient.connect(
    testDatabaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
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

async function checkUsernameExists(username) {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      testDatabaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      async (err, db) => {
        if (err) reject(err);
        var dbo = db.db(databaseName);
        dbo
          .collection("User")
          .findOne(
            username,
            { projection: { username: 1 } },
            async (err, result) => {
              if (err) throw err;
              console.log(result);
              resolve(result === null);
              db.close();
            }
          );
      }
    );
  });
}

module.exports = { submitUser, checkUsernameExists };
