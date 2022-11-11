const express = require('express');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
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
