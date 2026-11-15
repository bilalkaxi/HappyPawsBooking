
import pool from './config/db.js';
import bcrypt from 'bcryptjs';

const name = 'Happy Paws Admin';
const email = 'admin@happypaws.com';
const password = 'Admin@12345';

try {
    const existing = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    if (existing.rows.length > 0) {
        console.log('Admin account already exists.');
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)`,
            [name, email, hashedPassword, 'admin']
        );

        console.log('Admin account created successfully!');
    }
} catch (error) {
    console.error('Error creating admin:', error);
} finally {
    await pool.end();
}
