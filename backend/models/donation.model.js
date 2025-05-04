
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  displayName: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
