
const { validationResult } = require('express-validator');
const BusinessPromotion = require('../models/business.model');

// Get all business promotions
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessPromotion.find()
      .populate('owner', 'name')
      .sort({ createdAt: -1 });
      
    res.json(businesses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const business = await BusinessPromotion.findById(req.params.id)
      .populate('owner', 'name');
      
    if (!business) {
      return res.status(404).json({ message: 'Business promotion not found' });
    }
    
    res.json(business);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Business promotion not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create a business promotion
exports.createBusiness = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      businessName,
      description,
      logo,
      website,
      location
    } = req.body;

    const newBusiness = new BusinessPromotion({
      businessName,
      description,
      logo,
      website,
      location,
      owner: req.user.id
    });

    const business = await newBusiness.save();
    
    // Populate owner information before sending response
    await business.populate('owner', 'name');
    
    res.status(201).json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update business promotion status (admin only)
exports.updateBusinessStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status } = req.body;
    
    const business = await BusinessPromotion.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: 'Business promotion not found' });
    }
    
    business.status = status;
    await business.save();
    
    res.json(business);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Business promotion not found' });
    }
    res.status(500).send('Server error');
  }
};
