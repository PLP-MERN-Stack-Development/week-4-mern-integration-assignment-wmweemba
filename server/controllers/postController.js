const Post = require('../models/Post');
const asyncHandler = require('../middleware/asyncHandler');

// Get all posts (with pagination, search, and filter)
exports.getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Search and filter
  const query = {};
  if (req.query.q) {
    query.$or = [
      { title: { $regex: req.query.q, $options: 'i' } },
      { content: { $regex: req.query.q, $options: 'i' } },
    ];
  }
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.author) {
    query.author = req.query.author;
  }

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(query),
  ]);

  res.json({
    posts,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
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

// Add a comment to a post
exports.addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  const { user, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  post.comments.push({ user, content });
  await post.save();
  res.status(201).json(post.comments[post.comments.length - 1]);
});

// Get comments for a post
exports.getComments = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('comments.user', 'username');
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(post.comments);
});

// Delete a comment from a post
exports.deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    throw error;
  }
  const commentId = req.params.commentId;
  post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
  await post.save();
  res.json({ message: 'Comment deleted' });
}); 