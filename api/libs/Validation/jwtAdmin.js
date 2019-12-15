import jwt from 'jsonwebtoken';
import configs from '../../config';

const ONE_HOUR = 1800000;

module.exports = {
  // Generates a token from supplied payload
  issueAdmin: (payload) => {
    return jwt.sign(payload, configs.JWT_SECRET, { expiresIn: ONE_HOUR });
  },

  // Verifies token on a request
  verifyAdmin: (token, callback) => {
    return jwt.verify(token, secret, callback);
  }
};
