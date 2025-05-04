
const express = require('express');
const { check } = require('express-validator');
const donationController = require('../controllers/donation.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Get donations by campaign ID (public)
router.get('/campaign/:campaignId', donationController.getDonationsByCampaign);

// Make a donation (auth required)
router.post('/', [
  authMiddleware,
  check('campaignId', 'Campaign ID is required').not().isEmpty(),
  check('amount', 'Amount must be a positive number').isNumeric().custom(value => value > 0),
  check('displayName', 'Display name is required').not().isEmpty()
], donationController.makeDonation);

module.exports = router;
