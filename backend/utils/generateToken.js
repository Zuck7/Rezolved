const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      username: user.username,
      userType: user.userType,
      role: user.userType, // Frontend expects 'role' field
      email: user.email,
      displayName: user.displayName || user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      studentId: user.studentId,
      employeeId: user.employeeId,
      position: user.position
    },
    process.env.SECRETKEY,
    {
      expiresIn: '24h'
    }
  );
};

module.exports = generateToken;