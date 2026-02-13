const express = require('express');
const router = express.Router();
const {
  validateDeal,
  getPriceRules
} = require('../controllers/pricing.controller');

router.post('/validate', validateDeal);
router.get('/rules/:productId', getPriceRules);

module.exports = router;
