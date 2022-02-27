const Product = require("../models/product.js");

exports.getAllProducts = (req, res) => {
  Product.find({}, (err, foundProducts) => {
    if (err) console.log(err);
    else {
      res.json({ products: foundProducts });
    }
  });
};

exports.createProduct = (req, res) => {
  let obj = {
    author: {
      id: req.user._id,
      username: req.user.username,
    },
    title: req.body.title,
    description: req.body.description,
  };

  Product.create(obj, function (err, success) {
    if (err) res.json({ status: 500 });
    else {
      res.json({ status: 201 });
    }
  });
};

exports.getProduct = (req, res) => {
  let _id = req.params.id;
  Product.findById(_id, function (err, foundProduct) {
    if (err) res.json({ status: 404 });
    else {
      res.json({ status: 200, product: foundProduct });
    }
  });
};

exports.editProduct = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body.product,
    function (err, success) {
      if (err) {
        res.json({ status: 500 });
      } else {
        res.json({ status: 204 });
      }
    }
  );
};

exports.searchProduct = (req, res) => {
  let searchParameter = req.query.search;
  Product.find(
    { title: new RegExp(searchParameter, "i") },
    function (err, foundProducts) {
      if (err) res.json({ status: 404 });
      else {
        console.log(foundProducts);
        res.json({ status: 200, products: foundProducts });
      }
    }
  );
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      req.json({ status: 404 });
    } else {
      req.json({ status: 200 });
    }
  });
};
