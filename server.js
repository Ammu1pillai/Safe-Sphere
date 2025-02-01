const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const portfinder = require('portfinder');
const routes = require('./routes');
dotenv.config();

const app = express();
app.use(express.json());
// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1);  // Exit the application if MySQL connection fails
  } else {
    console.log('Connected to MySQL!');
  }
});

app.use('/', routes(db));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Women Safety API is running');
});

portfinder.getPortPromise().then((port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error finding an available port:', err);
});
