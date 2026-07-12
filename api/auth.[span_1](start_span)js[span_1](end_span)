const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Creates a secure scramble of the password
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { action, username, password } = req.body;

  try {
    if (action === 'register') {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = hashPassword(password, salt);
      const password_hash = `${salt}:${hash}`;
      
      const result = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
        [username, password_hash]
      );
      res.status(200).json({ userId: result.rows[0].id, message: 'Registered successfully!' });
      
    } else if (action === 'login') {
      const result = await pool.query('SELECT id, password_hash FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0) return res.status(401).json({ error: 'User not found' });
      
      const user = result.rows[0];
      const [salt, storedHash] = user.password_hash.split(':');
      const hash = hashPassword(password, salt);
      
      if (hash === storedHash) {
        res.status(200).json({ userId: user.id, message: 'Logged in!' });
      } else {
        res.status(401).json({ error: 'Incorrect password' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
