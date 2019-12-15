import jwt from 'jsonwebtoken';
import configs from '../../config';

const ONE_HOUR = 872800000;

module.exports = {
  // Generates a token from supplied payload
  issueRefresh: (payload) => {
    return jwt.sign(payload, configs.JWT_SECRET, { expiresIn: ONE_HOUR });
  },

  // Verifies token on a request
  verifyRefresh: (token, callback) => {
    return jwt.verify(token, secret, callback);
  }
};
