const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { checkPassword, getUserById, getUser } = require("../controllers/User");

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  var user = getUserById(id);
  console.log(user)
  if (user === null) {
    done({});
  } else {
    done(null, user);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      var user = await getUser(username);
      if(!user) {
        return done(null, false, { msg: "This username does not exists!" });
      }
      var isPasswordValid = await checkPassword(password, user.password); 
      if (!isPasswordValid) {
        return done(null, false, { msg: "Incorrect password!" });
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
