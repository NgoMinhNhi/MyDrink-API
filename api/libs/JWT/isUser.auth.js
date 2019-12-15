import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../../models/user.model';
import configs from '../../config';

const JWTStrategy = passportJWT.Strategy;
const extractJwt = passportJWT.ExtractJwt;
const jwtOptions = {
  secretOrKey: configs.JWT_SECRET,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
};

let strategy = new JWTStrategy(jwtOptions, async (token, done) => {
  try {
    let user = await User.findById(token._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

passport.use('user',strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export default {
  init: () => {
    return passport.initialize();
  },
  auth: () => {
    return passport.authenticate('user', {session: false});
  }
};
