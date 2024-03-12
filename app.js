require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


// create app
const app = express();

// 
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
};


// config 
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser());



app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, './', 'index.html');

    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// routes

const userRouter = require('./routes/user.routes')
app.use('/api/v1/user', userRouter);

const collegeRouter = require('./routes/college.routes')
app.use('/api/v1/college', collegeRouter);

const studentRouter = require('./routes/student.routes')
app.use('/api/v1/college/student', studentRouter)

module.exports = app;