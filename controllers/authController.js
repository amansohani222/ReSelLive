require("dotenv").config();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.handelLogin = (req, res) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (!user.validatePassword(req.body.password)) {
      res.json({ status: 403 });
    } else {
      const username = req.body.username;
      const user = { name: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ status: 200, token: accessToken });
    }
  });
};

exports.handelSignup = (req, res) => {
  //TODO : Add validation before registration
  let new_user = new User({ username: req.body.username });
  new_user.password = new_user.generateHash(req.body.password);
  new_user.save();
  res.json({ status: 200 });
};
