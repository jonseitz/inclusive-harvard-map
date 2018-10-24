/** @module server/errorHandler */

/**
 * Final middleware to send error messages when routes fail
 * @method  errorHandler
 * @param  {Error}  err  the error object
 * @param  {Object} req  the request object
 * @param  {Object}  res  the response object
 * @param  {Function}  next  the next function;
 */

export default (err, req, res) => {
  console.log(err);
  res.status(500);
  res.set('Content-Type', 'application/json');
  res.write({ error: err.message });
  res.end();
};
