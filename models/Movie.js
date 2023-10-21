const pool = require('../config.js');

class Movie {
    static async get(limit, page) {
        try {
            const query = 'SELECT * FROM movies LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [limit, page]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getById(id) {
        try {
            const query = `SELECT * FROM movies WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async post(obj) {
        try {
            const data = [obj.id, obj.title, obj.genres, obj.year];
            const query = `INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)`;
            const result = pool.query(query, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async put(id, obj) {
        try {
            const data = [obj.title, obj.genres, obj.year];
            const query = `UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4`;
            const result = await pool.query(query, [...data, id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async putPhoto(id, photo) {
        try {
            const query = `UPDATE movies SET photo = $1 WHERE id = $2`;
            const result = await pool.query(query, [photo, id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete(id) {
        try {
            const query = `DELETE FROM movies WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Movie;