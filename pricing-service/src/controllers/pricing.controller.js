const products = require('../models/product.model');
const { validatePrice } = require('../services/pricing.logic');

exports.validateDeal = (req, res) => {
  const { productId, finalPrice } = req.body;

  const product = products[productId];
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const result = validatePrice(product, finalPrice);

  res.json(result);
};

exports.getPriceRules = (req, res) => {
  const { productId } = req.params;

  const product = products[productId];
  if (!product) return res.status(404).json({ error: 'Product not found' });

  res.json(product);
};
