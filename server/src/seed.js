const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const Category = require('../models/category');
const Product = require('../models/product');

const databaseSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('Old data cleared!');

        const categories = await Category.insertMany([
            {
                name: "Fruits",
                description: "Fresh and healthy fruits",
                image:"/products/fruits/fruits.webp"
            },
            {
                name: "Vegetables",
                description: "Fresh vegetables for everyday meals",
                image: "/products/vegetables/vegetables.webp"
            },
            {
                name: "Leafy Greens",
                description: "Fresh leafy green vegetables",
                image: "/products/leafygreens/leafy-greens.webp"
            },
            {
                name: "Root Vegetables",
                description: "Fresh and nutritious root vegetables",
                image: "/products/rootvegetables/root-vegetables.webp"
            },
            {
                name: "Herbs",
                description: "Fresh herbs for cooking and seasoning",
                image: "/products/herbs/herbs.webp"
            }
        ]);

        console.log('Categories created!');
        
        const fruits = categories.find(
            (category) => category.name === "Fruits"
        );
        const vegetables = categories.find(
            (category) => category.name === "Vegetables"
        );
        const leafyGreens = categories.find(
            (category) => category.name === "Leafy Greens"
        );
        const rootVegetables = categories.find(
            (category) => category.name === "Root Vegetables"
        );
        const herbs = categories.find(
            (category) => category.name === "Herbs"
        );

        const products = await Product.insertMany([
        //Fruits
            {
                name: "Apple",
                price: 3600,
                category: fruits._id,
                image: "/products/fruits/apple.webp",
                stock: 100,
                unitQuantity: "6 per pack",
                isAvailable: true
            },
            {
                name: "Banana",
                price: 4000,
                category: fruits._id,
                image: "/products/fruits/banana.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Mango",
                price: 5000,
                category: fruits._id,
                image: "/products/fruits/mango.webp",
                stock: 100,
                unitQuantity: "10 pieces",
                isAvailable: true
            },
            {
                name: "Orange",
                price: 3000,
                category: fruits._id,
                image: "/products/fruits/orange.webp",
                stock: 100,
                unitQuantity: "20 per pack",
                isAvailable: true
            },
            {
                name: "Pineapple",
                price: 1500,
                category: fruits._id,
                image: "/products/fruits/pineapple.webp",
                stock: 100,
                unitQuantity: "1 piece",
                isAvailable: true
            },
            {
                name: "Papaya",
                price: 1000,
                category: fruits._id,
                image: "/products/fruits/papaya.webp",
                stock: 100,
                unitQuantity: "1 piece",
                isAvailable: true
            },
            {
                name: "Grapes",
                price: 4500,
                category: fruits._id,
                image: "/products/fruits/grapes.webp",
                stock: 100,
                unitQuantity: "500 g",
                isAvailable: true
            },
            {
                name: "Strawberry",
                price: 5000,
                category: fruits._id,
                image: "/products/fruits/strawberry.webp",
                stock: 100,
                unitQuantity: "250 g",
                isAvailable: true
            },
            {
                name: "Blueberry",
                price: 5000,
                category: fruits._id,
                image: "/products/fruits/blueberry.webp",
                stock: 100,
                unitQuantity: "250 g",
                isAvailable: true
            },
            {
                name: "Pear",
                price: 3000,
                category: fruits._id,
                image: "/products/fruits/pear.webp",
                stock: 100,
                unitQuantity: "4 per pack",
                isAvailable: true
            },
        // Vegetables
            {
                name: "Carrot",
                price: 800,
                category: vegetables._id,
                image: "/products/vegetables/carrot.webp",
                stock: 100,
                unitQuantity: "500 g",
                isAvailable: true
            },
            {
                name: "Cabbage",
                price: 1200,
                category: vegetables._id,
                image: "/products/vegetables/cabbage.webp",
                stock: 100,
                unitQuantity: "1 piece",
                isAvailable: true
            },
            {
                name: "Broccoli",
                price: 2500,
                category: vegetables._id,
                image: "/products/vegetables/broccoli.webp",
                stock: 100,
                unitQuantity: "1 kg",
                isAvailable: true
            },
            {
                name: "Tomato",
                price: 4000,
                category: vegetables._id,
                image: "/products/vegetables/tomato.webp",
                stock: 100,
                unitQuantity: "3 kg",
                isAvailable: true
            },
            {
                name: "Cucumber",
                price: 4000,
                category: vegetables._id,
                image: "/products/vegetables/cucumber.webp",
                stock: 100,
                unitQuantity: "3 pieces",
                isAvailable: true
            },
            {
                name: "Bell Pepper",
                price: 4000,
                category: vegetables._id,
                image: "/products/vegetables/bellpepper.webp",
                stock: 100,
                unitQuantity: "6 per pack",
                isAvailable: true
            },
            {
                name: "Green Beans",
                price: 100,
                category: vegetables._id,
                image: "/products/vegetables/greenbeans.webp",
                stock: 100,
                unitQuantity: "1 kg",
                isAvailable: true
            },
            {
                name: "Cauliflower",
                price: 3500,
                category: vegetables._id,
                image: "/products/vegetables/cauliflower.webp",
                stock: 100,
                unitQuantity: "1 piece",
                isAvailable: true
            },
            {
                name: "Zucchini",
                price: 2000,
                category: vegetables._id,
                image: "/products/vegetables/zucchini.webp",
                stock: 100,
                unitQuantity: "500 g",
                isAvailable: true
            },
            {
                name: "Eggplant",
                price: 2000,
                category: vegetables._id,
                image: "/products/vegetables/eggplant.webp",
                stock: 100,
                unitQuantity: "5 pieces",
                isAvailable: true
            },
        // Leafy Greens
            {
                name: "Spinach",
                price: 1000,
                category: leafyGreens._id,
                image: "/products/leafygreens/spinach.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Lettuce",
                price: 1200,
                category: leafyGreens._id,
                image: "/products/leafygreens/lettuce.webp",
                stock: 100,
                unitQuantity: "1 kg",
                isAvailable: true
            },
            {
                name: "Kale",
                price: 1500,
                category: leafyGreens._id,
                image: "/products/leafygreens/kale.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Waterleaf",
                price: 1200,
                category: leafyGreens._id,
                image: "/products/leafygreens/waterleaf.webp",
                stock: 100,
                unitQuantity: "1 kg",
                isAvailable: true
            },
            {
                name: "Pumpkin leaves",
                price: 1000,
                category: leafyGreens._id,
                image: "/products/leafygreens/pumpkinleaves.webp",
                stock: 100,
                unitQuantity: "1 kg",
                isAvailable: true
            },
        // Root Vegetables
            {
                name: "Potato",
                price: 5000,
                category: rootVegetables._id,
                image: "/products/rootvegetables/potato.webp",
                stock: 100,
                unitQuantity: "2 kg",
                isAvailable: true
            },
            {
                name: "Sweet Potato",
                price: 3000,
                category: rootVegetables._id,
                image: "/products/rootvegetables/sweet-potato.webp",
                stock: 100,
                unitQuantity: "2 kg",
                isAvailable: true
            },
            {
                name: "Beetroot",
                price: 2000,
                category: rootVegetables._id,
                image: "/products/rootvegetables/beetroot.webp",
                stock: 100,
                unitQuantity: "2 kg",
                isAvailable: true
            },
            {
                name: "Cassava",
                price: 4000,
                category: rootVegetables._id,
                image: "/products/rootvegetables/cassava.webp",
                stock: 100,
                unitQuantity: "2 kg",
                isAvailable: true
            },
            {
                name: "Yam",
                price: 7000,
                category: rootVegetables._id,
                image: "/products/rootvegetables/yam.webp",
                stock: 100,
                unitQuantity: "2 kg",
                isAvailable: true
            },
            {
                name: "Ginger",
                price: 1500,
                category: rootVegetables._id,
                image: "/products/rootvegetables/ginger.webp",
                stock: 100,
                unitQuantity: "500 g",
                isAvailable: true
            },
        // Herbs
            {
                name: "Mint",
                price: 800,
                category: herbs._id,
                image: "/products/herbs/mint.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Basil",
                price: 1000,
                category: herbs._id,
                image: "/products/herbs/basil.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Parsley",
                price: 800,
                category: herbs._id,
                image: "/products/herbs/parsley.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Cilantro",
                price: 1000,
                category: herbs._id,
                image: "/products/herbs/cilantro.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Rosemary",
                price: 800,
                category: herbs._id,
                image: "/products/herbs/rosemary.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
            {
                name: "Thyme",
                price: 1000,
                category: herbs._id,
                image: "/products/herbs/thyme.webp",
                stock: 100,
                unitQuantity: "1 bunch",
                isAvailable: true
            },
        ]);

        console.log(`${products.length} products created.`);
        console.log('Database seeded successfully');

        await mongoose.connection.close();
        console.log('MongoDB connection closed');

    }
    catch(error) {
        console.error('Error seeding database:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

databaseSeed();