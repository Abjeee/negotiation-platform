require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const negotiateRoutes = require('./routes/negotiate.routes');
app.use('/negotiate', negotiateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Negotiation service running on port ${PORT}`);
});
