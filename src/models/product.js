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

class Product {
    static async getAll() {
        try {
            const sql = "SELECT * FROM products";
            const results = await query(sql);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const sql = await query('SELECT * FROM products WHERE id = ?', [id]);
            return sql[0]; // Assuming you want to return the first result
        } catch (error) {
            throw error;
        }
    }

    static async create(productData) {
        const { name, description, price, inventory } = productData;
        try {
            const result = await query(
                'INSERT INTO products (name, description, price, inventory) VALUES (?, ?, ?, ?)',
                [name, description, price, inventory]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, productData) {
        const { name, description, price, inventory } = productData;
        try {
            await query(
                'UPDATE products SET name=?, description=?, price=?, inventory=? WHERE id=?',
                [name, description, price, inventory, id]
            );
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await query('DELETE FROM products WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        }
    }

    static async getPaginatedList(pageNumber, pageSize, sortBy, sortOrder) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const sql = `SELECT * FROM products ORDER BY ${sortBy} ${sortOrder} LIMIT ?, ?`;
            const values = [offset, pageSize];
            
            const results = await query(sql, values);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getAllSorted(sortBy, sortOrder) {
        try {
            const sql = `SELECT * FROM products ORDER BY ${sortBy} ${sortOrder}`;
            const results = await query(sql);
            console.log("hello");
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;
