const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    let urlQuery = JSON.stringify(req.query);
    //Handle [gte] in url
    urlQuery = urlQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    urlQuery = JSON.parse(urlQuery);

    let toursQuery = Tour.find(urlQuery);
    // sort
    if (req.query.sort) {
      const sortList = req.query.sort.split(',').join(' ');
      toursQuery.sort(sortList);
    }

    //fields
    if (req.query.fields) {
      const fieldsList = req.query.fields.split(',').join(' ');
      toursQuery.select(fieldsList);
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skipValue = (page - 1) * limit;
    toursQuery.skip(skipValue).limit(limit);

    const tours = await toursQuery;
    res.status(200).json({ length: tours.length, tours });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res
        .status(404)
        .json({ Error: `Tour with id: ${req.params.id} was not found` });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!tour) {
      return res
        .status(404)
        .json({ Error: `Tour with id: ${req.params.id} was not found` });
    }

    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res
        .status(404)
        .json({ Error: `Tour with id: ${req.params.id} was not found` });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
