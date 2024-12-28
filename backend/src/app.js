const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors({
  origin: `${process.env.ORIGIN}`,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
const userRoutes = require('./routes/user.routes');
const providerRoutes = require('./routes/provider.routes');
const geoRoutes = require('./routes/geo.routes');

app.use('/users', userRoutes);
app.use('/providers', providerRoutes);
app.use('/geo', geoRoutes);

module.exports = app;