const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require(
  "../controllers/productController"
);

router.use(protect);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

module.exports = router;