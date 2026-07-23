export function sendSuccess(
  res,
  data,
  message = "Request successful",
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res,
  statusCode = 500,
  message = "Something went wrong",
) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
