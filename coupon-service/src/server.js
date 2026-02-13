require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const couponRoutes = require('./routes/coupon.routes');
app.use('/coupon', couponRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Coupon service running on port ${PORT}`);
});
