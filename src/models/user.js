const pool = require('../config/db');

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

class User {
    static async getByUsername(username) {
        try {
            const data = await query('SELECT * FROM users WHERE username = ?', [username]);
            console.log(data);
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        const { username, password } = userData;
        try {
            const data = await query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
            return data.insertId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
