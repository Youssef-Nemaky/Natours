const getAllTours = async (req, res) => {
  res.status(200).send('Get All Tours');
};

const getTour = async (req, res) => {
  res.status(200).send('Get Tour');
};

const updateTour = async (req, res) => {
  res.status(200).send('Update Tour');
};

const createTour = async (req, res) => {
  res.status(200).send('Create Tour');
};

const deleteTour = async (req, res) => {
  res.status(200).send('Delete Tour');
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
