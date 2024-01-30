const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'your_database_connection_string' with your actual PostgreSQL connection string
// Replace 'your_postgresql_connection_string' with the actual connection string
const pool = new Pool({
  connectionString: 'postgresql://postgres:Viorica1998!@localhost:5432/gabrielapetrovwebsite',
  
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (replace 'public' with your actual folder name)
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { firstName, lastName, email, content } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Name, last name, and email are required fields' });
    }

    // Save contact form data to the PostgreSQL database
    const insertQuery = `
      INSERT INTO contact_forms (first_name, last_name, email, content)
      VALUES ($1, $2, $3, $4)
    `;

    const values = [firstName, lastName, email, content|| null];

    await pool.query(insertQuery, values);

    return res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



