const express = require('express');
const router = express.Router();
const {
  startSession,
  sendMessage,
  sendOffer,
  getStatus
} = require('../controllers/negotiate.controller');

router.post('/start', startSession);
router.post('/message', sendMessage);
router.post('/offer', sendOffer);
router.get('/status/:sessionId', getStatus);

module.exports = router;
