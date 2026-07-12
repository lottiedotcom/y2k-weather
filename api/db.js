const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    try {
        if (req.method === 'GET') {
            const result = await pool.query('SELECT * FROM plant_instances WHERE user_id = $1', [userId]);
            res.status(200).json({ plants: result.rows });
        } 
        else if (req.method === 'POST') {
            const { plant_template_id, nickname, shelf_type } = req.body;
            await pool.query(
                'INSERT INTO plant_instances (user_id, plant_template_id, nickname, shelf_type) VALUES ($1, $2, $3, $4)',
                [userId, plant_template_id, nickname, shelf_type]
            );
            res.status(200).json({ message: 'Added!' });
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
