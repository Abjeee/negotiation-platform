exports.validatePrice = (product, finalPrice) => {
  if (finalPrice < product.minPrice) {
    return {
      allowed: false,
      reason: 'Below minimum price threshold'
    };
  }

  const discountPercent = ((product.basePrice - finalPrice) / product.basePrice) * 100;

  if (discountPercent > product.maxDiscountPercent) {
    return {
      allowed: false,
      reason: 'Discount exceeds allowed limit'
    };
  }

  return {
    allowed: true,
    reason: 'Approved'
  };
};
