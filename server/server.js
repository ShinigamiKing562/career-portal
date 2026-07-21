import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import jobsRoutes from "./routes/jobsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

try {
  const connection = await pool.getConnection();
  console.log("Connected to MySQL");
  connection.release();
} catch (err) {
  console.error(err.message);
}

app.use("/api/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Career Portal API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
