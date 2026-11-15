import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import 'dotenv/config'
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Happy Paw is running!');
})

app.get('/health', async (req,res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log(result.rows);

        res.json({
            message: 'DATABASE CONNECTED',
            time: result.rows[0]?.current_time
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'DATABSE FAILED'
        });
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

