const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = async (req, res) => {
  try {
    const userId = req.headers['user-id']; 
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    if (req.method === 'GET') {
      const result = await pool.query('SELECT data FROM plants WHERE user_id = $1', [userId]);
      res.status(200).json({ data: result.rows.length > 0 ? result.rows[0].data : {} });
    } else if (req.method === 'POST') {
      const { plantData } = req.body;
      const existing = await pool.query('SELECT id FROM plants WHERE user_id = $1', [userId]);
      
      if (existing.rows.length > 0) {
          await pool.query('UPDATE plants SET data = $1 WHERE user_id = $2', [plantData, userId]);
      } else {
          await pool.query('INSERT INTO plants (user_id, data) VALUES ($1, $2)', [userId, plantData]);
      }
      res.status(200).json({ message: 'Saved to cloud!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
