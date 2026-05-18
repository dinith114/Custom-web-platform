const User = require('../users/user.model');
const { generateToken } = require('./auth.middleware');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * POST /api/auth/register
 * Create a new user account
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(errorResponse('Name, email, and password are required.'));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(errorResponse('An account with this email already exists.'));
  }

  // Create user (password is hashed via pre-save hook)
  const user = await User.create({
    name,
    email,
    passwordHash: password,
  });

  // Generate JWT
  const token = generateToken(user);

  res.status(201).json(
    successResponse(
      { user, token },
      'Account created successfully.'
    )
  );
};

/**
 * POST /api/auth/login
 * Authenticate user and return JWT
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(errorResponse('Email and password are required.'));
  }

  // Find user (passwordHash is not excluded by default, so no need for select)
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json(errorResponse('Invalid email or password.'));
  }

  // Check if account is active
  if (user.status !== 'active') {
    return res.status(403).json(errorResponse('Your account has been suspended.'));
  }

  // Compare password — need to get passwordHash explicitly
  const userWithPassword = await User.findOne({ email }).lean();
  const bcrypt = require('bcryptjs');
  const isMatch = await bcrypt.compare(password, userWithPassword.passwordHash);
  if (!isMatch) {
    return res.status(401).json(errorResponse('Invalid email or password.'));
  }

  // Generate JWT
  const token = generateToken(user);

  res.json(
    successResponse(
      { user, token },
      'Login successful.'
    )
  );
};

/**
 * GET /api/auth/profile
 * Get current user's profile (protected)
 */
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json(errorResponse('User not found.'));
  }

  res.json(successResponse(user, 'Profile retrieved successfully.'));
};

/**
 * PUT /api/auth/profile
 * Update current user's profile (protected)
 */
const updateProfile = async (req, res) => {
  const { name, avatarUrl } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, avatarUrl },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json(errorResponse('User not found.'));
  }

  res.json(successResponse(user, 'Profile updated successfully.'));
};

module.exports = { register, login, getProfile, updateProfile };
