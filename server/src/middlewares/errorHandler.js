function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  const response = { message };

  if (err.data) {
    response.data = err.data;
  }

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;
