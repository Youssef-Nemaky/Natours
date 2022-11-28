const mongoose = require('mongoose');

const connectDB = (URI) =>
  mongoose.connect(URI, (err) => {
    if (!err) {
      console.log('Connected to DB...');
    }
  });

module.exports = connectDB;
