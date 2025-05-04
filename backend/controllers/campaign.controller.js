
const { validationResult } = require('express-validator');
const Campaign = require('../models/campaign.model');

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('creator', 'name avatar')
      .sort({ createdAt: -1 });
      
    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name avatar');
      
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create a campaign
exports.createCampaign = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      shortDescription,
      goal,
      category,
      image,
      location
    } = req.body;

    const newCampaign = new Campaign({
      title,
      description,
      shortDescription,
      goal,
      category,
      image,
      location,
      creator: req.user.id
    });

    const campaign = await newCampaign.save();
    
    // Populate creator information before sending response
    await campaign.populate('creator', 'name avatar');
    
    res.status(201).json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update campaign status (admin only)
exports.updateCampaignStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status } = req.body;
    
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    campaign.status = status;
    await campaign.save();
    
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(500).send('Server error');
  }
};

// Join a campaign
exports.joinCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Increase participants count
    campaign.participants += 1;
    await campaign.save();
    
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(500).send('Server error');
  }
};

// Share a campaign
exports.shareCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Increase shares count
    campaign.shares += 1;
    await campaign.save();
    
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(500).send('Server error');
  }
};
