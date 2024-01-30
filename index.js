const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./src/middleware/authMiddleware'); // Add this line
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { getPaginatedProductLists, getSortedProductList } = require('./src/controllers/productController');

const app = express();

app.use(bodyParser.json());

// Apply authMiddleware to secure routes
app.use('/products', authMiddleware.authenticate, productRoutes);
app.get('/product',authMiddleware.authenticate, getPaginatedProductLists)
app.get('/product/sorted', authMiddleware.authenticate, getSortedProductList)
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
