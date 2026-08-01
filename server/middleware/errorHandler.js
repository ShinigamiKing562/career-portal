import { sendError } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export default function errorHandler(err, req, res, next) {
  console.error(err);

  sendError(
    res,
    err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    err.message || "Internal Server Error",
  );
}
