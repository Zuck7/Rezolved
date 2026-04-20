const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      username,
      email,
      password,
      userType = 'USER',
      firstName,
      lastName,
      studentId,
      department,
      employeeId,
      position
    } = req.body;

    // Generate username from email if not provided
    const generatedUsername = username || email.split('@')[0];

    const userExists = await User.findOne({
      $or: [{ email }, { username: generatedUsername }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    const userData = {
      username: generatedUsername,
      email,
      password,
      userType,
      firstName,
      lastName
    };

    if (userType === 'USER' && studentId) {
      userData.studentId = studentId;
    }

    if (userType === 'ADMIN') {
      if (!department) {
        return res.status(400).json({
          success: false,
          message: 'Department is required for admin users'
        });
      }
      userData.department = department;
      userData.employeeId = employeeId;
      userData.position = position;
    }

    const user = await User.create(userData);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        department: user.department,
        studentId: user.studentId,
        employeeId: user.employeeId,
        position: user.position
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.isActive || !user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        department: user.department,
        studentId: user.studentId,
        employeeId: user.employeeId,
        position: user.position
      },
      token
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

module.exports = {
  signup,
  signin,
  logout
};