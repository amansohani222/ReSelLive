const Product = require("../models/product.js");
const User = require("../models/user.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

exports.hasOwnership = (req, res, next) => {
  Product.findById(req.params.id, function (err, foundproduct) {
    if (err) {
      return res.sendStatus(404);
    } else {
      if (!req.user._id.equals(foundproduct.author.id)) {
        return res.sendStatus(401);
      }
      next();
    }
  });
};
