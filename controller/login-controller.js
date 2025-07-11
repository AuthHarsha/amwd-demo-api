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

const searchUser = (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user by email
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (rows.length === 0) {
        // No user found with that email
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = rows[0];

      // 2. Compare the password with the stored hash
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!result) {
          // Password does not match
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // 3. Password is correct — generate JWT token and login successful
        const token = generateToken(user.id, user.email);

        res.json({
          message: "Login successful",
          token: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      });
    }
  );
};

module.exports = {
  searchUser,
};
