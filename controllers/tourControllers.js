const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
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
