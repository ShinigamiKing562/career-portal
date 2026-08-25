import express from "express";
import { loginController } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/login", loginController);
router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

export default router;
