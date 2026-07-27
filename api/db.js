const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    try {
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
