const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error('Error:', err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    data: {},
  });
};

export default errorMiddleware;
