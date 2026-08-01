import { HTTP_STATUS } from "../constants/httpStatus.js";

export function sendSuccess(
  res,
  data,
  message = "Request successful",
  statusCode = HTTP_STATUS.OK,
  meta = null,
) {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
}

export function sendError(
  res,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  message = "Something went wrong",
  errors = null,
) {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
}
