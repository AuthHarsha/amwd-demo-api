const getAllCoustomer = (req, res) => {
  // connect db and get record
};

const saveCoustomer = (req, res) => {
  let name = req.body.name;

  res.send("Data Saved! " + name);
};

const updateCoustomer = (req, res) => {
  // connect db and update record
};

const deleteCoustomer = (req, res) => {
  // connect db and delete record
};

const searchCoustomer = (req, res) => {
  // connect db and search record
};

module.exports = {
  getAllCoustomer,
  saveCoustomer,
  updateCoustomer,
  deleteCoustomer,
  searchCoustomer,
};
