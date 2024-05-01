const { validationResult } = require('express-validator');
const AuthUser = require('../models/AuthUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const authUser = new AuthUser({ username, password: hashedPassword, role });
    await authUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const authUser = await AuthUser.findOne({ username });
    if (!authUser) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, authUser.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ user: { id: authUser.id, role: authUser.role } }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
