require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/products', express.static(path.join(__dirname, 'src/products')));
app.use('/categories', express.static(path.join(__dirname, 'src/categories')));

connectDB();

app.use(express.json());

//Displaying images on the express server
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Home Page!')
});
app.use('/freshcart', userRoutes);
app.use('/freshcart/products', productRoutes);
app.use('/freshcart/category', categoryRoutes);
app.use('/freshcart/cart', cartRoutes);
app.use('/freshcart/orders', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});