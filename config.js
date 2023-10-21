const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies_database',
    password: 'root',
    port: 5432
});

pool.connect((err) => {
    if (err) throw new Error(err.message);
    console.log('Connected to database on port 5432...');
});

module.exports = pool;