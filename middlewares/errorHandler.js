const globalErrorMiddleware = (error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode;
  const isProduction = process.env.NODE_ENV === "production";

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
    },
  });
};

module.exports = {
  globalErrorMiddleware,
};
