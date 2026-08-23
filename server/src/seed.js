require('dotenv').config();
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
                image:"fruits.jpg"
            },
            {
                name: "Vegetables",
                description: "Fresh vegetables for everyday meals",
                image: "vegetables.jpg"
            },
            {
                name: "Leafy Greens",
                description: "Fresh leafy green vegetables",
                image: "leafy-greens.jpg"
            },
            {
                name: "Root Vegetables",
                description: "Fresh and nutritious root vegetables",
                image: "root-vegetables.jpg"
            },
            {
                name: "Herbs",
                description: "Fresh herbs for cooking and seasoning",
                image: "Herbs.jpg"
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
                image: "apple.jpg",
                stock: 100,
                quantityperunit: 6,
                unit: "pack",
                isAvailable: true
            },
            {
                name: "Banana",
                price: 4000,
                category: fruits._id,
                image: "banana.jpg",
                stock: 100,
                quantityperunit: 10,
                unit: "bunch",
                isAvailable: true
            },
            {
                name: "Mango",
                price: 3000,
                category: fruits._id,
                image: "mango.jpg",
                stock: 100,
                quantityperunit: 6,
                unit: "kg",
                isAvailable: true
            },
            {
                name: "Orange",
                price: 3000,
                category: fruits._id,
                image: "orange.jpg",
                stock: 100,
                quantityperunit: 20,
                unit: "pack",
                isAvailable: true
            },
            {
                name: "Pineapple",
                price: 1500,
                category: fruits._id,
                image: "pineapple.jpg",
                stock: 100,
                quantityperunit: 1,
                unit: "piece",
                isAvailable: true
            },
            {
                name: "Papaya",
                price: 1000,
                category: fruits._id,
                image: "papaya.jpg",
                stock: 100,
                quantityperunit: 1,
                unit: "piece",
                isAvailable: true
            },
            {
                name: "Grapes",
                price: 4500,
                category: fruits._id,
                image: "grapes.jpg",
                stock: 100,
                weight: "500",
                unit: "g",
                isAvailable: true
            },
            {
                name: "Strawberry",
                price: 5000,
                category: fruits._id,
                image: "strawberry.jpg",
                stock: 100,
                weight: "250",
                unit: "g",
                isAvailable: true
            },
            {
                name: "Blueberry",
                price: 5000,
                category: fruits._id,
                image: "blueberry.jpg",
                stock: 100,
                weight: "250",
                unit: "g",
                isAvailable: true
            },
            {
                name: "Pear",
                price: 3000,
                category: fruits._id,
                image: "pear.jpg",
                stock: 100,
                quantityperunit: 4,
                unit: "pack",
                isAvailable: true
            },
        // Vegetables
            {
                name: "Carrot",
                price: 1500,
                category: vegetables._id,
                image: "carrot.jpg",
                stock: 50,
                unit: "kg",
                isAvailable: true
            },
            {
                name: "Cabbage",
                price: 1200,
                category: vegetables._id,
                image: "cabbage.jpg",
                stock: 30,
                unit: "piece",
                isAvailable: true
            },
            {
                name: "Broccoli",
                price: 2500,
                category: vegetables._id,
                image: "broccoli.jpg",
                stock: 25,
                unit: "kg",
                isAvailable: true
            },
        // Leafy Greens
            {
                name: "Spinach",
                price: 1000,
                category: leafyGreens._id,
                image: "spinach.jpg",
                stock: 40,
                unit: "bunch",
                isAvailable: true
            },
            {
                name: "Lettuce",
                price: 1200,
                category: leafyGreens._id,
                image: "lettuce.jpg",
                stock: 35,
                unit: "piece",
                isAvailable: true
            },
            {
                name: "Kale",
                price: 1500,
                category: leafyGreens._id,
                image: "kale.jpg",
                stock: 30,
                unit: "bunch",
                isAvailable: true
            },
        // Root Vegetables
            {
                name: "Potato",
                price: 1800,
                category: rootVegetables._id,
                image: "potato.jpg",
                stock: 60,
                unit: "kg",
                isAvailable: true
            },
            {
                name: "Sweet Potato",
                price: 2000,
                category: rootVegetables._id,
                image: "sweet-potato.jpg",
                stock: 40,
                unit: "kg",
                isAvailable: true
            },
            {
                name: "Beetroot",
                price: 2200,
                category: rootVegetables._id,
                image: "beetroot.jpg",
                stock: 25,
                unit: "kg",
                isAvailable: true
            },
        // Herbs
            {
                name: "Mint",
                price: 800,
                category: herbs._id,
                image: "mint.jpg",
                stock: 30,
                unit: "bunch",
                isAvailable: true
            },
            {
                name: "Basil",
                price: 1000,
                category: herbs._id,
                image: "basil.jpg",
                stock: 25,
                unit: "bunch",
                isAvailable: true
            },
            {
                name: "Parsley",
                price: 800,
                category: herbs._id,
                image: "parsley.jpg",
                stock: 30,
                unit: "bunch",
                isAvailable: true
            }
        ]);

        console.log(`${products.length} products created.`);
        console.log('Database seeded successfully');

        await mong

    }
    catch(error) {

    }
}