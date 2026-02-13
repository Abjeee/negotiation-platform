const { v4: uuidv4 } = require('uuid');

exports.createCoupon = ({ productId, userId, finalPrice, expiresInMinutes = 30 }) => {
  const code = `DEAL-${uuidv4().split('-')[0].toUpperCase()}`;

  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  return {
    code,
    productId,
    userId,
    finalPrice,
    expiresAt,
    used: false,
    createdAt: Date.now()
  };
};

exports.isExpired = (coupon) => {
  return Date.now() > coupon.expiresAt;
};
