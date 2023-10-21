const pool = require('../config.js');

class User {
    static async get(limit, page) {
        try {
            const query = 'SELECT * FROM users LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [limit, page]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getById(id) {
        try {
            const query = `SELECT * FROM users WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const result = await pool.query(query, [email]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async post(obj) {
        try {
            const data = [obj.id, obj.email, obj.gender, obj.hashPassword, obj.role];
            const query = `INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)`;
            const result = await pool.query(query, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async put(id, obj) {
        try {
            const data = [obj.email, obj.gender, obj.hashPassword, obj.role];
            const query = `UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5`;
            const result = await pool.query(query, [...data, id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(id) {
        try {
            const query = `DELETE FROM users WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = User;