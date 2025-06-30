const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
  },
  { timestamps: true }
);

// Virtual for posts in this category
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
});

// Ensure virtual fields are serialized
CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Category', CategorySchema); 