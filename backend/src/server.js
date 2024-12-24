const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

dotenv.config();

const port = process.env.PORT || 3000;
connectDB()

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});