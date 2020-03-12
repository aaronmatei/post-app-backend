const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const User = require('../models/User');

router.put(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email address already exists!');
          }
        });
      })
      .normalizeEmail(),
    check('password')
      .trim()
      .isLength({ min: 6 }),
    check('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);
router.post('/login', authController.login);

module.exports = router;
