const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

const app = express();
dotenv.config();

app.use(cors({
  origin: `${process.env.ORIGIN}`,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '/temp/uploads/');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
})
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  req.file ? res.send('File uploaded') : res.send('File not uploaded');
  
});

// Routes
const userRoutes = require('./routes/user.routes');
const providerRoutes = require('./routes/provider.routes');
const geoRoutes = require('./routes/geo.routes');
const bookingRoutes = require('./routes/booking.routes');
const serviceRoutes = require('./routes/service.routes');

app.use('/users', userRoutes);
app.use('/providers', providerRoutes);
app.use('/geo', geoRoutes);
app.use('/booking', bookingRoutes);
app.use('/service', serviceRoutes);

module.exports = upload;
module.exports = app;