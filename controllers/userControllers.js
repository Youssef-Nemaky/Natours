const getAllUsers = async (req, res) => {
  res.status(200).send('Get All Users');
};

const getUser = async (req, res) => {
  res.status(200).send('Get User');
};

const updateUser = async (req, res) => {
  res.status(200).send('Update User');
};

const createUser = async (req, res) => {
  res.status(200).send('Create User');
};

const deleteUser = async (req, res) => {
  res.status(200).send('Delete User');
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
