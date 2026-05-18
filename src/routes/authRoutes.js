const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidation } = require('../validations/authValidation');
const { validationResult } = require('express-validator');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

router.post('/register', registerValidation, validate, register);
router.post('/login', login);

module.exports = router;