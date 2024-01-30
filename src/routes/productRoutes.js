const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { getPaginatedProductLists } = require('../controllers/productController');

const router = express.Router();

// CRUD operations
router.get('/', authMiddleware.authenticate, ProductController.getAllProducts);
router.get('/:id', authMiddleware.authenticate, ProductController.getProductById);
router.post('/', authMiddleware.authenticate, ProductController.createProduct);
router.put('/:id', authMiddleware.authenticate, ProductController.updateProduct);
router.delete('/:id', authMiddleware.authenticate, ProductController.deleteProduct);

// Additional features
router.get('/paginate', getPaginatedProductLists);
router.get('/sorted', authMiddleware.authenticate, ProductController.getAllProductsSorted);

module.exports = router;
