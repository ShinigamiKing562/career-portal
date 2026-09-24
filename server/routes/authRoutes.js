import express from "express";
import { loginController } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import cors from "cors";

const router = express.Router();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

router.post("/login", loginController);
router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

export default router;
