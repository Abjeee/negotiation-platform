exports.evaluateOffer = (userOffer, basePrice, minPrice) => {
  if (userOffer >= basePrice) {
    return {
      type: 'accept',
      price: userOffer,
      message: 'Deal accepted at your price.'
    };
  }

  if (userOffer >= minPrice) {
    return {
      type: 'counter',
      price: Math.round((userOffer + basePrice) / 2),
      message: 'That’s close. I can meet you in the middle.'
    };
  }

  return {
    type: 'reject',
    price: minPrice,
    message: 'That price is too low. Best I can do is this.'
  };
};
