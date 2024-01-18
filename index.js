require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT;
const cloudinary = require('cloudinary')
const connectionDB = require('./config/Database.config')

// cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



app.listen(PORT, () => {
    // connect data base
    connectionDB();
    console.log(`server is listening at http://localhost:${PORT} `);
})