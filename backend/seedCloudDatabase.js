const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const User = require('./models/user.model');
const Campaign = require('./models/campaign.model');
const BusinessPromotion = require('./models/business.model');
const Donation = require('./models/donation.model');
const Category = require('./models/category.model');

// Sample data
const categories = [
  { name: 'Environment', slug: 'environment', icon: '🌱' },
  { name: 'Education', slug: 'education', icon: '📚' },
  { name: 'Health', slug: 'health', icon: '❤️' },
  { name: 'Community', slug: 'community', icon: '🤝' },
  { name: 'Animal Welfare', slug: 'animal-welfare', icon: '🐾' },
  { name: 'Technology', slug: 'technology', icon: '💻' },
  { name: 'Arts & Culture', slug: 'arts-culture', icon: '🎨' },
  { name: 'Sports', slug: 'sports', icon: '⚽' }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@acs.com',
  password: 'admin123',
  role: 'admin'
};

const sampleUsers = [
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'user'
  }
];

async function seedCloudDatabase() {
  try {
    console.log('Connecting to cloud database...');
    
    // Connect to cloud database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected successfully! Starting to seed data...');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await BusinessPromotion.deleteMany({});
    await Donation.deleteMany({});
    await Category.deleteMany({});

    // Seed categories
    console.log('Seeding categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✓ ${insertedCategories.length} categories created`);

    // Seed admin user
    console.log('Seeding admin user...');
    const admin = new User(adminUser);
    await admin.save();
    console.log('✓ Admin user created: admin@acs.com / admin123');

    // Seed sample users
    console.log('Seeding sample users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✓ ${users.length} sample users created`);

    // Seed sample campaigns
    console.log('Seeding sample campaigns...');
    const sampleCampaigns = [
      {
        title: 'Clean Melbourne Waterways',
        description: 'Join us in cleaning up Melbourne\'s beautiful waterways and protecting marine life.',
        shortDescription: 'Clean up Melbourne\'s waterways and protect marine life with monthly volunteer events.',
        goal: 50000,
        raised: 15000,
        category: 'environment',
        creator: admin._id,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        status: 'approved',
        location: 'Melbourne, VIC'
      },
      {
        title: 'Digital Literacy for Seniors',
        description: 'Teaching essential digital skills to senior citizens in Melbourne communities.',
        shortDescription: 'Free computer and smartphone classes for seniors to bridge the digital divide.',
        goal: 25000,
        raised: 8500,
        category: 'education',
        creator: users[0]._id,
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
        status: 'approved',
        location: 'Melbourne, VIC'
      },
      {
        title: 'Mental Health Support Network',
        description: 'Creating peer support groups for mental health awareness and assistance.',
        shortDescription: 'Community-based mental health support groups to reduce stigma and provide assistance.',
        goal: 40000,
        raised: 22000,
        category: 'health',
        creator: users[1]._id,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
        status: 'approved',
        location: 'Melbourne, VIC'
      }
    ];

    const insertedCampaigns = await Campaign.insertMany(sampleCampaigns);
    console.log(`✓ ${insertedCampaigns.length} sample campaigns created`);

    // Seed sample business promotions
    console.log('Seeding sample business promotions...');
    const sampleBusinesses = [
      {
        businessName: 'Green Earth Cafe',
        description: 'Sustainable cafe serving organic, locally-sourced food and beverages. Green Earth Cafe is committed to environmental sustainability. We source all ingredients locally, use compostable packaging, and donate 5% of profits to environmental causes. Visit us for the best organic coffee in Melbourne!',
        owner: users[0]._id,
        location: 'Melbourne, VIC',
        logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
        website: 'https://greenearthcafe.com',
        status: 'approved'
      },
      {
        businessName: 'TechForGood Melbourne',
        description: 'Technology consulting with a focus on non-profit and social impact organizations. We provide affordable technology solutions specifically for non-profits, charities, and social enterprises. Our services include website development, database management, and digital transformation consulting.',
        owner: users[1]._id,
        location: 'Melbourne, VIC',
        logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        website: 'https://techforgood.melbourne',
        status: 'approved'
      },
      {
        businessName: 'Community Arts Studio',
        description: 'Art classes and workshops that bring communities together through creativity. Our studio offers art classes for all ages and skill levels. We run special programs for disadvantaged youth and seniors, believing that art has the power to heal, unite, and transform communities.',
        owner: admin._id,
        location: 'Melbourne, VIC',
        logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
        website: 'https://communityarts.melbourne',
        status: 'approved'
      }
    ];

    const insertedBusinesses = await BusinessPromotion.insertMany(sampleBusinesses);
    console.log(`✓ ${insertedBusinesses.length} sample business promotions created`);

    // Seed sample donations
    console.log('Seeding sample donations...');
    const sampleDonations = [
      {
        campaignId: insertedCampaigns[0]._id,
        userId: users[0]._id,
        amount: 100,
        displayName: 'John Smith',
        message: 'Great cause! Happy to support clean waterways.'
      },
      {
        campaignId: insertedCampaigns[1]._id,
        userId: users[1]._id,
        amount: 50,
        displayName: 'Sarah Johnson',
        message: 'My grandmother would love this program!'
      },
      {
        campaignId: insertedCampaigns[2]._id,
        userId: admin._id,
        amount: 200,
        displayName: 'Anonymous',
        message: 'Mental health is so important. Thank you for this initiative.'
      }
    ];

    const insertedDonations = await Donation.insertMany(sampleDonations);
    console.log(`✓ ${insertedDonations.length} sample donations created`);

    console.log('\n🎉 Cloud database seeding completed successfully!');
    console.log('\n📝 Summary:');
    console.log(`- Categories: ${insertedCategories.length}`);
    console.log(`- Users: ${sampleUsers.length + 1} (including admin)`);
    console.log(`- Campaigns: ${insertedCampaigns.length}`);
    console.log(`- Business Promotions: ${insertedBusinesses.length}`);
    console.log(`- Donations: ${insertedDonations.length}`);
    console.log('\n🔐 Admin Credentials:');
    console.log('Email: admin@acs.com');
    console.log('Password: admin123');
    
    await mongoose.disconnect();
    console.log('\n✅ Database connection closed.');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
seedCloudDatabase(); 