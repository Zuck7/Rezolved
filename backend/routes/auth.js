const express = require('express');
const { body } = require('express-validator');
const { signup, signin, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  signin
);

router.post('/users',
  [
    body('username')
      .optional()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('userType')
      .optional()
      .isIn(['USER', 'ADMIN'])
      .withMessage('User type must be either USER or ADMIN'),
    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('First name must be between 1 and 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Last name must be between 1 and 50 characters'),
    body('department')
      .optional()
      .isIn(['IT', 'HR', 'ADMIN', 'ACADEMICS', 'FACILITIES', 'FINANCE', 'LIBRARY', 'STUDENT_SERVICES'])
      .withMessage('Invalid department')
  ],
  signup
);

router.post('/logout', authenticate, logout);

module.exports = router;