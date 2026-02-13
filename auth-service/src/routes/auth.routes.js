const express = require('express');
const router = express.Router();
const {
  register,
  login,
  createApiKey,
  verifyToken
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/api-key', createApiKey);
router.post('/verify', verifyToken);

module.exports = router;
