import { HTTP_STATUS } from "../constants/httpStatus.js";

export default class ApiError extends Error {
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = "Something went wrong",
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
