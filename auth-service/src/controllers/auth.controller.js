const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const users = [];     // TEMP (DB later)
const apiKeys = [];   // TEMP (DB later)

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    email,
    password: hash,
    role: role || 'user'
  };

  users.push(user);

  res.json({ message: 'User registered', userId: user.id });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};

exports.createApiKey = (req, res) => {
  const key = 'api_' + uuidv4().replace(/-/g, '');

  const apiKeyObj = {
    id: uuidv4(),
    key,
    active: true,
    created_at: new Date()
  };

  apiKeys.push(apiKeyObj);

  res.json({ apiKey: key });
};

exports.verifyToken = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false });
  }
};
