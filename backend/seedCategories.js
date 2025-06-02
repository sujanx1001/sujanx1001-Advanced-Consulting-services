const mongoose = require('mongoose');
const Category = require('./models/category.model');

const categories = [
  { name: 'Environment', slug: 'environment', icon: '🌱' },
  { name: 'Education', slug: 'education', icon: '📚' },
  { name: 'Health', slug: 'health', icon: '❤️' },
  { name: 'Community', slug: 'community', icon: '🤝' },
  { name: 'Animal Welfare', slug: 'animal-welfare', icon: '🐾' },
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/social-aware-connect');
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Categories seeded!');
  await mongoose.disconnect();
}

seed().catch(console.error); 