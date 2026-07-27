const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = async (req, res) => {
    const token = req.headers['session-token'];
    const dbType = req.headers['db-type'] || 'instance';

    if (dbType === 'template' && req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM plant_templates');
            return res.status(200).json({ templates: result.rows });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (!token) return res.status(401).json({ error: 'Not logged in' });

    try {
        const userRes = await pool.query('SELECT id, username FROM users WHERE session_token = $1', [token]);
        if (userRes.rows.length === 0) return res.status(401).json({ error: 'Invalid or expired session' });
        
        const userId = userRes.rows[0].id;
        const username = userRes.rows[0].username;

        if (dbType === 'template' && req.method === 'POST') {
            if (username.toLowerCase() !== 'plum') return res.status(403).json({ error: 'Admin access denied.' });
            
            const t = req.body;
            await pool.query(
                `INSERT INTO plant_templates (id, name, stamp_img, toxic_pets, water_frequency, water_schedule, vpd_min, vpd_max, temp_floor, temp_ceiling, opt_min, opt_max, wind_tolerance, lunar_affinity, cycle, season) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
                [t.id, t.name, t.stamp_img, t.toxic_pets, t.water_frequency, t.water_schedule, t.vpd_min, t.vpd_max, t.temp_floor, t.temp_ceiling, t.opt_min, t.opt_max, t.wind_tolerance, t.lunar_affinity, t.cycle, t.season]
            );
            return res.status(200).json({ message: 'Template safely uploaded to Cloud!' });
        }

        if (req.method === 'GET') {
            const result = await pool.query(
                `SELECT id, user_id, plant_template_id, nickname, shelf_type, custom_image,
                EXTRACT(EPOCH FROM last_watered_at) * 1000 AS last_watered_at, 
                created_at FROM plant_instances WHERE user_id = $1 ORDER BY created_at ASC`, 
                [userId]
            );
            res.status(200).json({ plants: result.rows });
        } 
        else if (req.method === 'POST') {
            const { plant_template_id, nickname, shelf_type, custom_image } = req.body;
            await pool.query(
                'INSERT INTO plant_instances (user_id, plant_template_id, nickname, shelf_type, custom_image) VALUES ($1, $2, $3, $4, $5)',
                [userId, plant_template_id, nickname, shelf_type, custom_image]
            );
            res.status(200).json({ message: 'Added!' });
        } 
        else if (req.method === 'PUT') {
            const { id } = req.body;
            await pool.query('UPDATE plant_instances SET last_watered_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2', [id, userId]);
            res.status(200).json({ message: 'Watered!' });
        }
        else if (req.method === 'DELETE') {
            const { id } = req.body;
            await pool.query('DELETE FROM plant_instances WHERE id = $1 AND user_id = $2', [id, userId]);
            res.status(200).json({ message: 'Deleted!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
