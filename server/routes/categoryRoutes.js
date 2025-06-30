const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryCreateValidator } = require('../validators/categoryValidator');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// GET /api/categories
router.get('/', categoryController.getAllCategories);

// POST /api/categories
router.post('/', categoryCreateValidator, handleValidationErrors, categoryController.createCategory);

module.exports = router; 