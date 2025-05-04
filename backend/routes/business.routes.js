
const express = require('express');
const { check } = require('express-validator');
const businessController = require('../controllers/business.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Get all business promotions (public)
router.get('/', businessController.getAllBusinesses);

// Get a single business promotion by ID (public)
router.get('/:id', businessController.getBusinessById);

// Create a new business promotion (auth required)
router.post('/', [
  authMiddleware,
  check('businessName', 'Business name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('logo', 'Logo is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], businessController.createBusiness);

// Update business promotion status (admin only)
router.patch('/:id/status', [
  authMiddleware,
  adminMiddleware,
  check('status', 'Status must be either approved or rejected').isIn(['approved', 'rejected'])
], businessController.updateBusinessStatus);

module.exports = router;
