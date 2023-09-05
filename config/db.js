const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const localMongo = config.get('localMongoURI');
let connectionHost = '';

const connectDB = async () => {
  if (process.env.ENVIRONMENT === 'development') {
    connectionHost = localMongo;
  } else {
    connectionHost = db;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(connectionHost, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
    console.log('Worms are wriggling...');
    console.log('Products Proceeding...');
    console.log("DIY's Dive... Dive...");
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
