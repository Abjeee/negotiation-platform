const { v4: uuidv4 } = require('uuid');
const sessions = require('../models/session.model');
const { evaluateOffer } = require('../services/negotiation.logic');

exports.startSession = (req, res) => {
  const { productId, basePrice, minPrice } = req.body;

  const sessionId = uuidv4();

  sessions[sessionId] = {
    sessionId,
    productId,
    basePrice,
    minPrice,
    status: 'active',
    history: []
  };

  res.json({
    sessionId,
    message: 'Negotiation started. Make an offer.'
  });
};

exports.sendMessage = (req, res) => {
  const { sessionId, message } = req.body;

  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session not found' });

  session.history.push({ from: 'user', message });

  res.json({
    reply: "I'm listening. What's your offer?"
  });
};

exports.sendOffer = (req, res) => {
  const { sessionId, offer } = req.body;

  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const result = evaluateOffer(
    offer,
    session.basePrice,
    session.minPrice
  );

  session.history.push({ from: 'user', offer });
  session.history.push({ from: 'ai', result });

  if (result.type === 'accept') {
    session.status = 'deal';
    session.finalPrice = result.price;
  }

  res.json({
    decision: result.type,
    price: result.price,
    message: result.message,
    status: session.status
  });
};

exports.getStatus = (req, res) => {
  const { sessionId } = req.params;

  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session not found' });

  res.json(session);
};
