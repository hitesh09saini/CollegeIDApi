require('dotenv').config();
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL;

const connectionDB = async () => {
    try {
        const result = await mongoose.connect(`${MONGO_URL}`);
        console.log(`MongoDB is Connected !! DB Host ${result.connection.host}`);
        return result;
    } catch (error) {
        console.log("Error: " + error);
        process.exit(1);
    }
}

module.exports = connectionDB;