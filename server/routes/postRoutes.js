const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { postCreateValidator, postUpdateValidator } = require('../validators/postValidator');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// GET /api/posts
router.get('/', postController.getAllPosts);

// GET /api/posts/:id
router.get('/:id', postController.getPostById);

// POST /api/posts
router.post('/', upload.single('image'), postCreateValidator, handleValidationErrors, postController.createPost);

// PUT /api/posts/:id
router.put('/:id', upload.single('image'), postUpdateValidator, handleValidationErrors, postController.updatePost);

// DELETE /api/posts/:id
router.delete('/:id', postController.deletePost);

// Comments routes
router.post('/:id/comments', postController.addComment);
router.get('/:id/comments', postController.getComments);
router.delete('/:id/comments/:commentId', postController.deleteComment);

module.exports = router; 