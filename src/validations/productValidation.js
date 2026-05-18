const { body } = require('express-validator');

exports.productValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be numeric'),
];