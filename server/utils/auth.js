// TODO: Implement JWT helpers
const jwt = require('jsonwebtoken');

const signToken = (payload) => {
  // TODO: Implement signToken
  // Use process.env.JWT_SECRET and expiry '7d'
};

const verifyToken = (token) => {
  // TODO: Implement verifyToken
  // Use process.env.JWT_SECRET
};

module.exports = { signToken, verifyToken };
