import { HTTP_STATUS } from "../constants/httpStatus.js";
import ApiError from "../utils/ApiError.js";

export default function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication is required"),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to perform this action",
        ),
      );
    }

    next();
  };
}
