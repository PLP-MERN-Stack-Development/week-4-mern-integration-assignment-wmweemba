const { body } = require('express-validator');

exports.postCreateValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content')
    .notEmpty().withMessage('Content is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Category must be a valid ID'),
];

exports.postUpdateValidator = [
  body('title')
    .optional()
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content')
    .optional(),
  body('category')
    .optional()
    .isMongoId().withMessage('Category must be a valid ID'),
];
