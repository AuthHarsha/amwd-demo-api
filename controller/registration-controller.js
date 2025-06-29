const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt-utils");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "amwd",
});

connection.connect();

const saveUser = (req, res) => {
  const { username, email, password } = req.body;
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
        (err, result) => {
          if (err) {
            console.error("DB insert error:", err);
            return res.status(500).json({ error: "Database Error" });
          }

          // Generate JWT token for the newly registered user
          const token = generateToken(result.insertId, email);

          res.json({
            message: "User registration successful!",
            token: token,
            user: {
              id: result.insertId,
              username: username,
              email: email,
            },
          });
        }
      );
    });
  });
};

module.exports = {
  saveUser,
};
