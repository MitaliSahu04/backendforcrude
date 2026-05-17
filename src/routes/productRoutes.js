const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const admin = require(
  "../middleware/adminMiddleware"
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
  admin,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  admin,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  admin,
  deleteProduct
);

module.exports = router;