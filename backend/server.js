const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123@Amaan",   
  database: "travel_booking",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// Receive form data & store in SQL
app.post("/book", (req, res) => {
  const {
    fullname,
    email,
    phone,
    gender,
    date,
    destination,
    notes,
  } = req.body;

  const sql = `
    INSERT INTO bookings 
    (fullname, email, phone, gender, travel_date, destination, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fullname, email, phone, gender, date, destination, notes],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
      } else {
        res.json({ message: "Booking stored successfully" });
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
