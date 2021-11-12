const mongoose = require('mongoose');
require('dotenv').config();

const password = process.env.DATABASE_KEY

const url = `mongodb+srv://prakash:${password}@cluster0.b1wzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('connected to database');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;