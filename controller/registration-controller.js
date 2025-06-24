const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "amwd",
});

connection.connect();

const saveUser = (req, res) => {
  const { username, email, password } = req.body;
  const bcrypt = require("bcrypt");
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      console.error("Salt generation error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.error("Hashing error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Now use the hashed password
      connection.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hash],
        (err, rows) => {
          if (err) {
            console.error("DB insert error:", err);
            return res.status(500).json({ error: "Database Error" });
          }

          res.json({ message: "User registration successful!" });
        }
      );
    });
  });
};

module.exports = {
  saveUser,
};
