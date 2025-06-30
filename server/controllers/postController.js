const Post = require('../models/Post');
const asyncHandler = require('../middleware/asyncHandler');

// Get all posts
exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('author category');
  res.json(posts);
});

// Get a specific post by ID
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author category');
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(post);
});

// Create a new post
exports.createPost = asyncHandler(async (req, res) => {
  const data = req.body;
  if (req.file) {
    data.featuredImage = `/uploads/${req.file.filename}`;
  }
  const post = new Post(data);
  await post.save();
  res.status(201).json(post);
});

// Update an existing post
exports.updatePost = asyncHandler(async (req, res) => {
  const data = req.body;
  if (req.file) {
    data.featuredImage = `/uploads/${req.file.filename}`;
  }
  const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(post);
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: 'Post deleted' });
}); 