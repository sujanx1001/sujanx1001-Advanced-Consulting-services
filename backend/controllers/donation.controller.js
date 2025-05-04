
const { validationResult } = require('express-validator');
const Donation = require('../models/donation.model');
const Campaign = require('../models/campaign.model');

// Get donations by campaign ID
exports.getDonationsByCampaign = async (req, res) => {
  try {
    const donations = await Donation.find({ campaignId: req.params.campaignId })
      .sort({ createdAt: -1 });
      
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Make a donation
exports.makeDonation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { campaignId, amount, displayName, message } = req.body;
    
    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Create new donation
    const newDonation = new Donation({
      campaignId,
      userId: req.user.id,
      amount,
      displayName,
      message
    });
    
    // Save donation
    const donation = await newDonation.save();
    
    // Update campaign raised amount
    campaign.raised += amount;
    await campaign.save();
    
    res.status(201).json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
