const coupons = require('../models/coupon.model');
const { createCoupon, isExpired } = require('../services/coupon.logic');

exports.generateCoupon = (req, res) => {
  const { productId, userId, finalPrice } = req.body;

  const coupon = createCoupon({ productId, userId, finalPrice });

  coupons[coupon.code] = coupon;

  res.json({
    couponCode: coupon.code,
    finalPrice,
    expiresAt: coupon.expiresAt
  });
};

exports.validateCoupon = (req, res) => {
  const { code, productId, userId } = req.body;

  const coupon = coupons[code];
  if (!coupon) return res.status(404).json({ valid: false, reason: 'Invalid code' });

  if (coupon.used) return res.json({ valid: false, reason: 'Already used' });
  if (isExpired(coupon)) return res.json({ valid: false, reason: 'Expired' });

  if (coupon.productId !== productId) {
    return res.json({ valid: false, reason: 'Product mismatch' });
  }

  if (coupon.userId !== userId) {
    return res.json({ valid: false, reason: 'User mismatch' });
  }

  res.json({
    valid: true,
    finalPrice: coupon.finalPrice
  });
};

exports.redeemCoupon = (req, res) => {
  const { code } = req.body;

  const coupon = coupons[code];
  if (!coupon) return res.status(404).json({ success: false, reason: 'Invalid code' });

  if (coupon.used) return res.json({ success: false, reason: 'Already redeemed' });
  if (isExpired(coupon)) return res.json({ success: false, reason: 'Expired' });

  coupon.used = true;
  coupon.usedAt = Date.now();

  res.json({
    success: true,
    message: 'Coupon redeemed successfully'
  });
};
