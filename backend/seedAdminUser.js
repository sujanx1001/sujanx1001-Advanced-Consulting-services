const mongoose = require('mongoose');
const User = require('./models/user.model');

async function seedAdmin() {
  await mongoose.connect('mongodb://localhost:27017/social-aware-connect');

  const email = 'admin@example.com';
  const password = 'admin123';
  const name = 'Admin User';

  // Remove existing admin user with this email
  await User.deleteOne({ email });

  // Create new admin user (password will be hashed by pre-save hook)
  const admin = new User({
    name,
    email,
    password,
    role: 'admin',
  });
  await admin.save();

  console.log('Admin user seeded!');
  await mongoose.disconnect();
}

seedAdmin().catch(console.error); 