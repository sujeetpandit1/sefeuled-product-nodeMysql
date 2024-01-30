const db = require('../config/db');
const ProductService = require('../service/productService');

async function getAllProducts(req, res) {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductById(req, res) {
    const productId = req.params.id;

    try {
        const product = await ProductService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createProduct(req, res) {
    const productData = req.body;

    try {
        const productId = await ProductService.createProduct(productData);
        res.status(201).json({ id: productId, message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    const productId = req.params.id;
    const productData = req.body;

    try {
        await ProductService.updateProduct(productId, productData);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    const productId = req.params.id;

    try {
        await ProductService.deleteProduct(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPaginatedProductLists = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        // Use the promise version of the query interface
        const [rows] = await db.promise().query(`
            SELECT * 
            FROM products 
            ORDER BY id
            LIMIT ? OFFSET ?;
        `, [parseInt(pageSize), parseInt(offset)]);

        // No need to close the connection when using promises

        res.json({ productList: rows }); // Assuming 'rows' is the array of products
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  

async function getAllProductsSorted(req, res) {
    const { sortBy = 'id', sortOrder = 'ASC' } = req.query;

    try {
        const products = await ProductService.getAllProductsSorted(sortBy, sortOrder);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSortedProductList = async (req, res) => {
    const { sortBy = 'id', sortOrder = 'ASC' } = req.query;

    try {
        // Validate and sanitize user input for sorting
        const allowedSortColumns = ['id', 'name']; // Add more columns as needed
        const validatedSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'id';
        const validatedSortOrder = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Use the promise version of the query interface
        const [rows] = await db.promise().query(`
            SELECT * 
            FROM products 
            ORDER BY ${validatedSortBy} ${validatedSortOrder};
        `);

        // No need to close the connection when using promises

        res.json({ productList: rows }); // Assuming 'rows' is the array of products
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getPaginatedProductLists,
    getAllProductsSorted,
    getSortedProductList
};
