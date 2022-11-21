const express = require('express');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required')
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("First Name must be 255 characters or less."),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required')
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Last name must be 255 characters or less."),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ max: 255 })
    .withMessage("Email must be 255 characters or less."),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .isLength({ max: 50})
    .withMessage('Please provide a username with at least 4 characters, and under 50 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .isLength({ max: 255 })
    .withMessage('Password must be 6 characters or more, but under 255 characters.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const isEmail = await User.findOne({ where: { email } });

    if (isEmail) {
      let err = Error("User already exists")
      err.errors = { email: "User with that email already exists" }
      err.status = 403;
      return next(err)
    }

    const isUserName = await User.findOne({ where: { username } });
    if (isUserName) {
      let err = Error("User already exists")
      err.errors = { username: "User with that username already exists" }
      err.status = 403;
      return next(err)
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    delete user.dataValues.updatedAt
    delete user.dataValues.createdAt
    user.dataValues.token = ""

    return res.json({
      user
    }
    );
  }
);



module.exports = router;
