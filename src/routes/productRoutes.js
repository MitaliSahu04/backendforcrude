// backend/routes/productRoutes.js

const express = require('express');

const router = express.Router();

// Middleware
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Controllers
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// ===============================
// GET ALL PRODUCTS
// ===============================
router.get(
  '/',
  authMiddleware,
  getProducts
);

// ===============================
// GET SINGLE PRODUCT
// ===============================
router.get(
  '/:id',
  authMiddleware,
  getSingleProduct
);

// ===============================
// CREATE PRODUCT
// ===============================
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createProduct
);

// ===============================
// UPDATE PRODUCT
// ===============================
router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  updateProduct
);

// ===============================
// DELETE PRODUCT
// ===============================
router.delete(
  '/:id',
  authMiddleware,
  deleteProduct
);

module.exports = router;