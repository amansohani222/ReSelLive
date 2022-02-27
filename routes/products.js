const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const middelware = require("../controllers/middleware.js");

router.get("/check", (req, res) => {
  res.json({ status: 200 });
});
router.get("/products", productController.getAllProducts);
router.get("/products/search", productController.searchProduct);
router.get("/product/:id", productController.getProduct);
router.post(
  "/products",
  middelware.isAuthenticated,
  productController.createProduct
);
router.post(
  "/product/:id",
  [middelware.isAuthenticated, middelware.hasOwnership],
  productController.createProduct
);
router.delete(
  "/product/:id",
  [middelware.isAuthenticated, middelware.hasOwnership],
  productController.deleteProduct
);

module.exports = router;
