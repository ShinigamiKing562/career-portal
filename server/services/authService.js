import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail } from "../models/userModel.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import ApiError from "../utils/ApiError.js";

export async function loginUser(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
  );

  return {
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}
