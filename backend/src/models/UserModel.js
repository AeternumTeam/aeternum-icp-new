import db from '../config/database.js';

export const getUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error("Database Error (getUsers):", error.message);
        throw new Error('Failed to fetch users');
    }
}

export const getUserByEmail = async (data) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [data.email]);
        return result.rows[0];
    } catch (error) {
        console.error("Database Error (getUserByUsername):", error.message);
        throw new Error('Failed to fetch user by username');
    }
}

export const getUserByUsername = async (data) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [data.username]);
        return result.rows[0];
    } catch (error) {
        console.error("Database Error (getUserByUsername):", error.message);
        throw new Error('Failed to fetch user by username');
    }
}

export const createUser = async (data) => {
    try {
        await db.query('INSERT INTO users (id, name, username, email, picture, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [data.id, data.name, data.username, data.email, data.picture, data.password, data.created_at, data.updated_at]
        );

        const result = await db.query('SELECT * FROM users WHERE id = $1', [data.id]);
        return result.rows[0];
    } catch (error) {
        console.error("Database Error (createUser):", error.message);
        throw new Error('Failed to create user');
    }
}