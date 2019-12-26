import jwt from 'jsonwebtoken';
import configs from '../../config';

export const ONE_MONTH = 2592000000;
export const ONE_DAY = "24h";

module.exports = {
  // Generates a token from supplied payload
  issue: (payload, expiredTime) => {
    return jwt.sign(payload, configs.JWT_SECRET, { expiresIn: expiredTime || ONE_MONTH });
  },

  // Verifies token on a request
  verify: (token, callback) => {
    console.log("verify")
    return jwt.verify(token, configs.JWT_SECRET, callback);
  },
  ONE_MONTH : 2592000000,
  ONE_DAY,

};
