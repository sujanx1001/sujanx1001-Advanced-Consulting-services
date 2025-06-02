const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const User = require('./models/user.model');
const Campaign = require('./models/campaign.model');
const BusinessPromotion = require('./models/business.model');
const Donation = require('./models/donation.model');
const Category = require('./models/category.model');

// Connect to old database
async function migrateData() {
  try {
    // Connect to old database
    await mongoose.connect('mongodb://localhost:27017/social-aware-connect', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Fetch all data from old database
    const users = await User.find({});
    const campaigns = await Campaign.find({});
    const businesses = await BusinessPromotion.find({});
    const donations = await Donation.find({});
    const categories = await Category.find({});

    // Disconnect from old database
    await mongoose.disconnect();

    // Connect to new database
    await mongoose.connect('mongodb://localhost:27017/acs-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear any existing data in new database
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await BusinessPromotion.deleteMany({});
    await Donation.deleteMany({});
    await Category.deleteMany({});

    // Insert all data into new database
    if (users.length) await User.insertMany(users);
    if (campaigns.length) await Campaign.insertMany(campaigns);
    if (businesses.length) await BusinessPromotion.insertMany(businesses);
    if (donations.length) await Donation.insertMany(donations);
    if (categories.length) await Category.insertMany(categories);

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();