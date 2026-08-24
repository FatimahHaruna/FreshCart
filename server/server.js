require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page!')
});
app.use('/freshcart/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});