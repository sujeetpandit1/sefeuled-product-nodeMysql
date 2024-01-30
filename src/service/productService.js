const Product = require('../models/product');

async function getAllProducts() {
    try {
        const products = await Product.getAll();
        return products;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try {
        const product = await Product.getById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        throw error;
    }
}

async function createProduct(productData) {
    try {
        const productId = await Product.create(productData);
        return productId;
    } catch (error) {
        throw error;
    }
}

async function updateProduct(id, productData) {
    try {
        const existingProduct = await Product.getById(id);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        await Product.update(id, productData);
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const existingProduct = await Product.getById(id);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        await Product.delete(id);
    } catch (error) {
        throw error;
    }
}

async function getPaginatedProductList(pageNumber, pageSize, sortBy, sortOrder) {
    try {
        const products = await Product.getPaginatedList(pageNumber, pageSize, sortBy, sortOrder);
        return products;
    } catch (error) {
        throw error;
    }
}

async function getAllProductsSorted(sortBy, sortOrder) {
    try {
        const products = await Product.getAllSorted(sortBy, sortOrder);
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getPaginatedProductList,
    getAllProductsSorted,
};
