  
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || "Pudding!";
    jwt.verify(authorization, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again. " });
  }
};