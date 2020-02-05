
const jwt = require("jsonwebtoken");

function signToken(user) {
  const payload = {
    username: user.username,
    userId: user.userId
  };
  const secret = process.env.JWT_SECRET || "Pudding!";
  const options = {
    expiresIn: "7d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = signToken;