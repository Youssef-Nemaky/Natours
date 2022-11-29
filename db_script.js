//Core Modules
require('dotenv').config();
const fs = require('fs');

//User Modules
const Tour = require('./models/tourModel');
const connectDB = require('./db/connectDB');

//Data Reading
let tourData = fs.readFileSync(`${__dirname}/dev-data/data/tours.json`);
tourData = JSON.parse(tourData);

//Populate Function
const populate = async () => {
  await connectDB(process.env.MONGO_URI);
  try {
    await Tour.insertMany(tourData);
    console.log('Database is populated');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Depopulate Function
const depopulate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Tour.deleteMany();
    console.log('Database is depopulated');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Check the passed arguments
if (process.argv[2] === 'populate') {
  populate();
} else if (process.argv[2] === 'depopulate') {
  depopulate();
} else {
  console.log(
    'Invalid Argument:\nUse\nnode db_script.js populate => load the data base with json data\nor\nnode db_script.js depopulate => unload the database'
  );
}
