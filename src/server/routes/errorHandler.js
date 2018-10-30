/** @module server/errorHandler */

/**
 * Final middleware to send error messages when routes fail
 * @method  errorHandler
 * @param  {Error}  err  the error object
 * @param  {Object} req  the request object
 * @param  {Object}  res  the response object
 * @param  {Function}  next  the next function;
 */

// eslint-disable-next-line
export default (err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
  res.end();
};
