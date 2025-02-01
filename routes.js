const express = require('express'); // Import the database connection from a separate file
const router = express.Router();
module.exports = (db) => {  // Accept db connection as argument

router.get('/', (req, res) => {
  res.send('Women Safety API is running');
});

// 📌 Route to fetch all incidents
router.get('/api/incidents', (req, res) => {
  db.query('SELECT * FROM incidents', (err, results) => {
    if (err) {
      console.error('Error fetching incidents:', err);
      res.status(500).send('Error fetching incidents');
    } else {
      res.json(results);
    }
  });
});

// 📌 Route to add a new incident
router.post('/api/incidents', (req, res) => {
  const { location, description, status } = req.body;

  if (!location || !description || !status) {
    return res.status(400).send('All fields (location, description, status) are required.');
  }

  const query = 'INSERT INTO incidents (location, description, status) VALUES (?, ?, ?)';
  db.query(query, [location, description, status], (err) => {
    if (err) {
      console.error('Error adding incident:', err);
      res.status(500).send('Error adding incident');
    } else {
      res.status(201).send('Incident added');
    }
  });
});

 router.put('/api/incidents/:id', (req, res) => {
    const incidentId = req.params.id;  // Get the incident ID from URL parameter
    const { location, description, status } = req.body;

    if (!location || !description || !status) {
      return res.status(400).send('All fields (location, description, status) are required.');
    }

    const query = 'UPDATE incidents SET location = ?, description = ?, status = ? WHERE id = ?';
    db.query(query, [location, description, status, incidentId], (err) => {
      if (err) {
        console.error('Error updating incident:', err);
        res.status(500).send('Error updating incident');
      } else {
        res.status(200).send('Incident updated');
      }
    });
  });

  // 📌 Route to delete an incident (DELETE method)
  router.delete('/api/incidents/:id', (req, res) => {
    const incidentId = req.params.id;  // Get the incident ID from URL parameter

    const query = 'DELETE FROM incidents WHERE id = ?';
    db.query(query, [incidentId], (err) => {
      if (err) {
        console.error('Error deleting incident:', err);
        res.status(500).send('Error deleting incident');
      } else {
        res.status(200).send('Incident deleted');
      }
    });
  });
return router;
};

