const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

// Get all categories
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create a new category
exports.createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
}); 