const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const portfinder = require('portfinder');
const routes = require('./routes'); // Assuming your routes are in the api.js file
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host from environment variable
  user: process.env.DB_USER, // Database user from environment variable
  password: process.env.DB_PASSWORD, // Database password from environment variable
  database: process.env.DB_NAME, // Database name from environment variable
});

// Test the connection to the database
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1); // Exit if the connection fails
  } else {
    console.log('Connected to MySQL!');
  }
});

// Use routes
app.use('/api', routes(db)); // Assuming routes are handled in api.js

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Women Safety API is running');
});

// Find an available port and start the server
portfinder.getPortPromise().then((port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error finding an available port:', err);
});

