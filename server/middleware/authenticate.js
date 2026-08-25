import jwt from "jsonwebtoken";

import { HTTP_STATUS } from "../constants/httpStatus.js";
import ApiError from "../utils/ApiError.js";
import { getUserById } from "../models/userModel.js";

export default async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication token is required",
      ),
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded.userId);

    if (!user) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED, "User no longer exists"),
      );
    }

    req.user = user;

    next();
  } catch {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token"));
  }
}
