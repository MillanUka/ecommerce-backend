const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    })
  );

module.exports = passport;