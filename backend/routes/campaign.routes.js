
const express = require('express');
const { check } = require('express-validator');
const campaignController = require('../controllers/campaign.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Get all campaigns (public)
router.get('/', campaignController.getAllCampaigns);

// Get a single campaign by ID (public)
router.get('/:id', campaignController.getCampaignById);

// Create a new campaign (auth required)
router.post('/', [
  authMiddleware,
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('shortDescription', 'Short description is required').not().isEmpty(),
  check('goal', 'Goal must be a positive number').isNumeric().custom(value => value > 0),
  check('category', 'Category is required').not().isEmpty(),
  check('image', 'Image is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], campaignController.createCampaign);

// Update campaign status (admin only)
router.patch('/:id/status', [
  authMiddleware,
  adminMiddleware,
  check('status', 'Status must be either approved or rejected').isIn(['approved', 'rejected'])
], campaignController.updateCampaignStatus);

// Join a campaign (auth required)
router.post('/:id/join', authMiddleware, campaignController.joinCampaign);

// Share a campaign
router.post('/:id/share', campaignController.shareCampaign);

module.exports = router;
