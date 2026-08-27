require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page!')
});
app.use('/freshcart', userRoutes);
app.use('/freshcart/products', productRoutes);
app.use('/freshcart/category', categoryRoutes);
app.use('', cartRoutes);
app.use('', orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});