require('dotenv').config({
    path: '../.env'
});
const asyncHandler = require('../middlewares/asyncHandler.middleware')
const AppError = require("../utils/error.utils");
const jwt = require('jsonwebtoken')

const isLoggedIn = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;
    console.log('token', token);
    
    if (!token) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If no decode send the message unauthorized
    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
    req.user = decoded;

    // Do not forget to call the next other wise the flow of execution will not be passed further
    next();
})


module.exports = isLoggedIn;