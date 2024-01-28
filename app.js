require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// create app
const app = express();

// 
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true, // Use 'credentials' instead of 'Credentials'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly specify allowed methods
};


// config 
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());


app.get('/', (req, res)=>{
   res.send('hello')
})

// routes

const userRouter = require('./routes/user.routes')
app.use('/api/v1/user', userRouter);


const collegeRouter = require('./routes/college.routes')
app.use('/api/v1/college', collegeRouter);

const studentRouter  = require('./routes/student.routes')
app.use('/api/v1/college/student', studentRouter)

module.exports = app;