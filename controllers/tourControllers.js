const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

const getAllTours = async (req, res) => {
  try {
    const toursQuery = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await toursQuery.query;
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

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {
          //   ratingsAverage: { $gte: 4.5 },
          //Get All tours
        },
      },

      {
        $group: {
          _id: null,
          numTous: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          avgRating: { $avg: '$ratingsAverage' },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
    const { year } = req.params;
    console.log(year);
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTours: -1,
        },
      },
    ]);
    res.status(200).json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
};
