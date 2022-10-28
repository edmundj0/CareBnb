const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {

    let returnErrObj = {}
    for (let err of validationErrors.errors) {
      returnErrObj[err.param] = err.msg
    }

    return res.status(400).json({
      message: 'Validation Error',
      statusCode: 400,
      errors: returnErrObj
    })
  }

  // if (!validationErrors.isEmpty()) {
  //   const errors = validationErrors
  //     .array()
  //     .map((error) => `${error.msg}`);

  //   const err = Error('Validation error');
  //   err.errors = errors;
  //   err.status = 400;
  //   err.title = 'Validation error';
  //   next(err);
  // }
  next();
};

module.exports = {
  handleValidationErrors
};
