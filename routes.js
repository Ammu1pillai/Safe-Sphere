const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.send('Women Safety API is running');
  });

  // Fetch all incidents
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

  // Add a new incident
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

  // Update an incident
  router.put('/api/incidents', (req, res) => {
    const incidentId = req.params.id;
    const { location, description, status } = req.body;

    if (!location || !description || !status) {
      return res.status(400).send('All fields (location, description, status) are required.');
    }

    db.query('SELECT * FROM incidents WHERE id = ?', [incidentId], (err, result) => {
      if (err) {
        console.error('Error fetching incident:', err);
        return res.status(500).send('Error fetching incident');
      }
      if (result.length === 0) {
        return res.status(404).send('Incident not found');
      }

      const updateQuery = 'UPDATE incidents SET location = ?, description = ?, status = ? WHERE id = ?';
      db.query(updateQuery, [location, description, status, incidentId], (err) => {
        if (err) {
          console.error('Error updating incident:', err);
          return res.status(500).send('Error updating incident');
        }
        res.status(200).send('Incident updated');
      });
    });
  });

  // New routes for frontend
  
  // Add a new trip
  router.post('/api/trips', (req, res) => {
    const { destination, exitTime, arrivalTime } = req.body;

    if (!destination || !exitTime || !arrivalTime) {
      return res.status(400).send('All fields (destination, exitTime, arrivalTime) are required.');
    }

    const query = 'INSERT INTO trips (destination, exitTime, arrivalTime) VALUES (?, ?, ?)';
    db.query(query, [destination, exitTime, arrivalTime], (err) => {
      if (err) {
        console.error('Error adding trip:', err);
        res.status(500).send('Error adding trip');
      } else {
        res.status(201).send('Trip added');
      }
    });
  });

  // Add a new emergency
  router.post('/api/emergency', (req, res) => {
    const { message, timestamp } = req.body;

    if (!message || !timestamp) {
      return res.status(400).send('All fields (message, timestamp) are required.');
    }

    const query = 'INSERT INTO emergencies (message, timestamp) VALUES (?, ?)';
    db.query(query, [message, timestamp], (err) => {
      if (err) {
        console.error('Error adding emergency:', err);
        res.status(500).send('Error adding emergency');
      } else {
        res.status(201).send('Emergency added');
      }
    });
  });

  // Add a new home notification
  router.post('/api/home', (req, res) => {
    const { message, timestamp } = req.body;

    if (!message || !timestamp) {
      return res.status(400).send('All fields (message, timestamp) are required.');
    }

    const query = 'INSERT INTO home_notifications (message, timestamp) VALUES (?, ?)';
    db.query(query, [message, timestamp], (err) => {
      if (err) {
        console.error('Error adding home notification:', err);
        res.status(500).send('Error adding home notification');
      } else {
        res.status(201).send('Home notification added');
      }
    });
  });

  // Add a new arrival notification
  router.post('/api/arrival', (req, res) => {
    const { message, timestamp } = req.body;

    if (!message || !timestamp) {
      return res.status(400).send('All fields (message, timestamp) are required.');
    }

    const query = 'INSERT INTO arrival_notifications (message, timestamp) VALUES (?, ?)';
    db.query(query, [message, timestamp], (err) => {
      if (err) {
        console.error('Error adding arrival notification:', err);
        res.status(500).send('Error adding arrival notification');
      } else {
        res.status(201).send('Arrival notification added');
      }
    });
  });

  // Add a new emergency contact
  router.post('/api/contacts', (req, res) => {
    const { userId, contactName, contactPhone } = req.body;

    if (!userId || !contactName || !contactPhone) {
      return res.status(400).send('All fields (userId, contactName, contactPhone) are required.');
    }

    const query = 'INSERT INTO emergency_contacts (userId, contactName, contactPhone) VALUES (?, ?, ?)';
    db.query(query, [userId, contactName, contactPhone], (err) => {
      if (err) {
        console.error('Error adding emergency contact:', err);
        res.status(500).send('Error adding emergency contact');
      } else {
        res.status(201).send('Emergency contact added');
      }
    });
  });

  // Add a new emergency service
  router.post('/api/services', (req, res) => {
    const { serviceName, servicePhone } = req.body;

    if (!serviceName || !servicePhone) {
      return res.status(400).send('All fields (serviceName, servicePhone) are required.');
    }

    const query = 'INSERT INTO emergency_services (serviceName, servicePhone) VALUES (?, ?)';
    db.query(query, [serviceName, servicePhone], (err) => {
      if (err) {
        console.error('Error adding emergency service:', err);
        res.status(500).send('Error adding emergency service');
      } else {
        res.status(201).send('Emergency service added');
      }
    });
  });

  // Add a new user
  router.post('/api/users', (req, res) => {
    const { username, email, phone } = req.body;

    if (!username || !email || !phone) {
      return res.status(400).send('All fields (username, email, phone) are required.');
    }

    const query = 'INSERT INTO users (username, email, phone) VALUES (?, ?, ?)';
    db.query(query, [username, email, phone], (err) => {
      if (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
      } else {
        res.status(201).send('User added');
      }
    });
  });

  return router;
};

