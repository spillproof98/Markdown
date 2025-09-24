const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again later.' },
});

router.post('/login', loginLimiter, login);
router.post('/register', register);

module.exports = router;

