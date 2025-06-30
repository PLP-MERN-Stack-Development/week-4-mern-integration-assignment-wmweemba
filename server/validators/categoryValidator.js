const { body } = require('express-validator');

exports.categoryCreateValidator = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 50 }).withMessage('Category name cannot be more than 50 characters'),
  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description cannot be more than 200 characters'),
];
