require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pricingRoutes = require('./routes/pricing.routes');
app.use('/pricing', pricingRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Pricing service running on port ${PORT}`);
});

