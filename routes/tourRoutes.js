const express = require('express');

const {
  getAllTours,
  getTour,
  updateTour,
  createTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourControllers');
const topToursMiddleware = require('../middlewares/topToursMiddleware');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/top-5-cheap').get(topToursMiddleware, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
