
const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Get all categories (public)
router.get('/', categoryController.getAllCategories);

// Create a category (admin only)
router.post('/', [
  authMiddleware,
  adminMiddleware,
], categoryController.createCategory);

// Update a category (admin only)
router.put('/:id', [
  authMiddleware,
  adminMiddleware,
], categoryController.updateCategory);

// Delete a category (admin only)
router.delete('/:id', [
  authMiddleware,
  adminMiddleware,
], categoryController.deleteCategory);

module.exports = router;
