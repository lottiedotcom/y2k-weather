const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = async (req, res) => {
    const { action, username, password, recoveryKey, newPassword } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        if (action === 'register') {
            if (!password) return res.status(400).json({ error: 'Password required' });
            
            const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
            if (existing.rows.length > 0) return res.status(400).json({ error: 'Username taken!' });

            const hash = await bcrypt.hash(password, 10);
            const recKey = 'FLORA-' + crypto.randomBytes(4).toString('hex').toUpperCase();
            const token = crypto.randomBytes(32).toString('hex');

            await pool.query(
                'INSERT INTO users (username, password_hash, recovery_key, session_token) VALUES ($1, $2, $3, $4)',
                [username, hash, recKey, token]
            );

            res.status(200).json({ message: 'Registered!', token: token, recoveryKey: recKey });
        } 
        else if (action === 'login') {
            if (!password) return res.status(400).json({ error: 'Password required' });

            const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (user.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

            const u = user.rows[0];

            if (u.locked_until && new Date(u.locked_until) > new Date()) {
                return res.status(403).json({ error: 'Account locked. Try again later.' });
            }

            const isValid = await bcrypt.compare(password, u.password_hash);
            if (!isValid) {
                const attempts = u.failed_attempts + 1;
                if (attempts >= 5) {
                    await pool.query("UPDATE users SET failed_attempts = 0, locked_until = CURRENT_TIMESTAMP + INTERVAL '15 minutes' WHERE username = $1", [username]);
                    return res.status(403).json({ error: 'Locked out for 15 minutes.' });
                } else {
                    await pool.query('UPDATE users SET failed_attempts = $1 WHERE username = $2', [attempts, username]);
                    return res.status(401).json({ error: `Invalid. ${5 - attempts} attempts left.` });
                }
            }

            const token = crypto.randomBytes(32).toString('hex');
            await pool.query('UPDATE users SET failed_attempts = 0, locked_until = NULL, session_token = $1 WHERE username = $2', [token, username]);
            
            res.status(200).json({ message: 'Logged in!', token: token });
        }
        else if (action === 'recover') {
            if (!recoveryKey || !newPassword) return res.status(400).json({ error: 'Key and new password required' });
            
            const user = await pool.query('SELECT * FROM users WHERE username = $1 AND recovery_key = $2', [username, recoveryKey]);
            if (user.rows.length === 0) return res.status(401).json({ error: 'Invalid Recovery Key' });

            const hash = await bcrypt.hash(newPassword, 10);
            const token = crypto.randomBytes(32).toString('hex');
            
            await pool.query('UPDATE users SET password_hash = $1, session_token = $2, failed_attempts = 0, locked_until = NULL WHERE username = $3', [hash, token, username]);
            
            res.status(200).json({ message: 'Password reset successful!', token: token });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
