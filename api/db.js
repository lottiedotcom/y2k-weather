const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = async (req, res) => {
  try {
    const { plantData } = req.body;
    await pool.query('INSERT INTO plants (data) VALUES ($1)', [plantData]);
    res.status(200).json({ message: 'Plant data saved!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

