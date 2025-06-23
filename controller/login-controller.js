const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "amwd",
});

connection.connect();

const searchUser = (req, res) => {
  // connect db and search record
};

module.exports = {
  searchUser,
};
