const errorHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  console.log("###globalErrorMiddleware###");
  console.log({
    message: error.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    details: error.details,
  });
  console.log("========================================");

  if (statusCode === 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    error: {
      status: statusCode,
      message:
        statusCode === 500 && isProduction
          ? "Internal server error"
          : error.message,
      success: false,
      ...(error.details ? { details: error.details } : {}),
    },
  });
};

module.exports = {
  errorHandler,
  globalErrorMiddleware,
};
