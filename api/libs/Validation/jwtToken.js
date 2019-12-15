import jwt from 'jsonwebtoken';
import configs from '../../config';

const ONE_HOUR = 172800000;

module.exports = {
  // Generates a token from supplied payload
  issue: (payload) => {
    return jwt.sign(payload, configs.JWT_SECRET, { expiresIn: ONE_HOUR });
  },

  // Verifies token on a request
  verify: (token, callback) => {
    return jwt.verify(token, configs.JWT_SECRET, callback);
  }
};
