import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import applicationsRoutes from "./routes/applicationsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
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
