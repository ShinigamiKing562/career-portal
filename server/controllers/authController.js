import asyncHandler from "../middleware/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import { loginUser } from "../services/authService.js";

import { sendSuccess } from "../utils/response.js";

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  sendSuccess(res, result, "Login successful", HTTP_STATUS.OK);
});
