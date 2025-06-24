const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "amwd",
});

connection.connect();

const saveUser = (req, res) => {
  res.json(req);
  // connect db and save record
  const { username, email, password } = req.body;
  const bcrypt = require("bcrypt");
  const saltRounds = 10;

  // Hash the password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) throw err;
      password = hash;
    });
  });

  connection.query(
    "insert into user(username, email, password) values(?, ?, ?)",
    [username, email, password],
    (err, rows) => {
      if (err) throw err;
      res.json({ message: "User registration Successful!" });
    }
  );
};

module.exports = {
  saveUser,
};
