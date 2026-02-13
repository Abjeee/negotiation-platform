const express = require('express');
const router = express.Router();
const {
  generateCoupon,
  validateCoupon,
  redeemCoupon
} = require('../controllers/coupon.controller');

router.post('/generate', generateCoupon);
router.post('/validate', validateCoupon);
router.post('/redeem', redeemCoupon);

module.exports = router;
