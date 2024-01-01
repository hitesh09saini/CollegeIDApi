require('dotenv').config();
const mongoose = require('mongoose')
const DB_NAME = require('../constants.js')
const MONGO_URL = process.env.MONGO_URL;

const connectionDB = async () => {
    try {
        const result = await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
        console.log(`MongoDB is Connected !! DB Host ${result.connection.host}`);
        return result;
    } catch (error) {
        console.log("Error: " + error);
        process.exit(1);
    }
}

module.exports = connectionDB;