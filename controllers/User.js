const MongoClient = require("mongodb").MongoClient;

const bcrypt = require("bcrypt");
const { testDatabaseUrl, databaseName } = require("../config");
const { createUser } = require("../models/User");

async function submitUser(req, res,email, password) {
  MongoClient.connect(
    testDatabaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      var dbo = db.db(databaseName);
      var newUser = createUser(email, password);
      dbo.collection("User").insertOne(newUser, function (err) {
        if (err) throw err;
        res.send({ msg: "Created new User." });
        db.close();
      });
    }
  );
}

async function getUserByEmail(email) {
  var searchQuery = new RegExp(email, "i");
  var query = { email: searchQuery };
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
            query,
            async (err, result) => {
              if (err) reject(null);
              resolve(result);
              db.close();
            }
          );
      }
    );
  });
}

async function getUserById(id) {
  var searchQuery = new RegExp(id, "i");
  var query = { _id: searchQuery };
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
            query,
            async (err, result) => {
              if (err) reject(null);
              resolve(result);
              db.close();
            }
          );
      }
    );
  });
}
async function encryptPassword(password) {
  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
}

async function checkPassword(password, hash) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if(err) reject(err);
      return resolve(result);
    });
  });
}

async function isAuthenticated (req,res,next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated())
     return next();
  else
     return res.status(401).json({msg: 'User not authenticated'});
}

module.exports = { submitUser, getUserByEmail, encryptPassword, checkPassword, getUserById, isAuthenticated };
