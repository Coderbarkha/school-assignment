// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend (important for Vercel)
app.use(
  cors({
    origin: "*", // allow all origins, or restrict to your frontend domain
  })
);

// Parse JSON bodies (in case you also want to send JSON later)
app.use(express.json());

// Serve uploaded images statically
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "schoolImages"); // save in /schoolImages folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

// ✅ POST /schools → add new school
app.post("/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? `/schoolImages/${req.file.filename}` : null;

  const sql = `
    INSERT INTO schools (name, address, city, state, contact, image, email_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [name, address, city, state, contact, image, email_id],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting school:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// ✅ GET /schools → fetch all schools
app.get("/schools", (req, res) => {
  const sql = "SELECT id, name, address, city, image FROM schools ORDER BY id DESC";

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching schools:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ DELETE /schools/:id → delete a school
app.delete("/schools/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM schools WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Delete error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully", id });
  });
});

// ✅ Root route (so "/" doesn’t return 404)
app.get("/", (req, res) => {
  res.send("✅ Backend is running. Use /schools to fetch data.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
