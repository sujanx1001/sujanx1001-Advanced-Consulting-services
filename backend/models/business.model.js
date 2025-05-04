
const mongoose = require('mongoose');

const businessPromotionSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const BusinessPromotion = mongoose.model('BusinessPromotion', businessPromotionSchema);

module.exports = BusinessPromotion;
