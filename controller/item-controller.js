const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "amwd",
});

connection.connect();

const getAllItem = (req, res) => {
  // connect db and get record
  connection.query("select * from vehicles", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

const saveItem = (req, res) => {
  // connect db and insert record
  connection.query(
    "insert into vehicles(brand, model, noOfGears, price, color) values(?, ?, ?, ?, ?)",
    [
      req.body.brand,
      req.body.model,
      req.body.noOfGears,
      req.body.price,
      req.body.color,
    ],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
};

const updateItem = (req, res) => {
  // connect db and update record
  connection.query(
    "update vehicles set brand=?, model=?, noOfGears=?, price=?, color=? where id=?",
    [
      req.body.brand,
      req.body.model,
      req.body.noOfGears,
      req.body.price,
      req.body.color,
      req.params.id,
    ],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
};

const deleteItem = (req, res) => {
  // connect db and delete record
  connection.query(
    "delete from vehicles where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
};

const searchItem = (req, res) => {
  // connect db and search record
  connection.query(
    "select * from vehicles where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
};

const getVehiclesWithParts = (req, res) => {
  connection.query(
    "SELECT vehicles.*, spare_parts.code, spare_parts.description, spare_parts.price AS part_price FROM vehicles LEFT JOIN spare_parts ON vehicles.id = spare_parts.vehicle_id",
    (err, rows) => {
      if (err) throw err;

      const groupedVehicles = [];

      // Helper to check if a vehicle already exists
      const vehicleMap = {};

      rows.forEach((row) => {
        if (!vehicleMap[row.id]) {
          // Create new vehicle entry
          vehicleMap[row.id] = {
            id: row.id,
            name: row.name, // adjust according to your actual column names
            model: row.model,
            noOfGears: row.noOfGears,
            price: row.price,
            parts: [],
          };
          groupedVehicles.push(vehicleMap[row.id]);
        }

        // If there's a part, add it to the vehicle's parts
        if (row.code) {
          vehicleMap[row.id].parts.push({
            code: row.code,
            description: row.description,
            part_price: row.part_price,
          });
        }
      });

      res.json(groupedVehicles);
    }
  );
};

const saveItemWithSpareParts = (req, res) => {
  const { brand, model, noOfGears, price, color, spare_parts } = req.body;

  // Step 1: Insert vehicle first
  connection.query(
    "INSERT INTO vehicles (brand, model, noOfGears, price, color) VALUES (?, ?, ?, ?, ?)",
    [brand, model, noOfGears, price, color],
    (err, result) => {
      if (err) {
        console.error("Error inserting vehicle:", err);
        return res.status(500).json({ error: "Vehicle insert failed" });
      }

      const vehicleId = result.insertId;

      // Step 2: Insert spare parts if any
      if (Array.isArray(spare_parts) && spare_parts.length > 0) {
        const values = spare_parts.map((part) => [
          vehicleId,
          part.code,
          part.description,
          part.price,
        ]);

        connection.query(
          "INSERT INTO spare_parts (vehicle_id, code, description, price) VALUES ?",
          [values],
          (err2) => {
            if (err2) {
              console.error("Error inserting spare parts:", err2);
              return res
                .status(500)
                .json({ error: "Spare parts insert failed" });
            }

            res.json({ message: "Vehicle and spare parts saved successfully" });
          }
        );
      } else {
        // If no spare parts, just return vehicle insert success
        res.json({ message: "Vehicle saved successfully (no spare parts)" });
      }
    }
  );
};

module.exports = {
  getAllItem,
  saveItem,
  updateItem,
  deleteItem,
  searchItem,
  getVehiclesWithParts,
  saveItemWithSpareParts,
};
