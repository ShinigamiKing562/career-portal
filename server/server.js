import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import pool from "./config/db.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import applicationsRoutes from "./routes/applicationsRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Career Portal API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
