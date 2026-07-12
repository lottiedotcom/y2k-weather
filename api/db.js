const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Load the most recently saved plant data
      const result = await pool.query('SELECT data FROM plants ORDER BY id DESC LIMIT 1');
      res.status(200).json({ data: result.rows.length > 0 ? result.rows[0].data : {} });
    } else if (req.method === 'POST') {
      // Save new plant data
      const { plantData } = req.body;
      await pool.query('INSERT INTO plants (data) VALUES ($1)', [plantData]);
      res.status(200).json({ message: 'Saved to cloud!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
