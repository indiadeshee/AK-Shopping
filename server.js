const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/coupons', require('./routes/coupons').router);
app.use('/api/referrals', require('./routes/referrals').router);
app.use('/api/rewards', require('./routes/rewards').router);
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/bulk-orders', require('./routes/bulk-orders'));
app.use('/api/search', require('./routes/advanced-search'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
