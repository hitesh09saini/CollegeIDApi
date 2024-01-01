
const User = require('../models/user.models')
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const AppError = require('../utils/error.utils')

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
    secure: true,
}

const register =  asyncHandler(  async(req, res, next)=>{
    let {email , password} = req.body;

    if(! email|| !password){
        throw next(new AppError('All fields is required', 404));
    }

    const user = await User.findOne({email});

    if(user){
        throw next(new AppError('Email Already exist', 404));
    }

    const newUser = await User({
        email,
        password,
    })

     // Save the user to the database
     await newUser.save();
     password = undefined;
     // Generate JWT token
     const token = await newUser.generateJETToken();
 
     res.cookie('token', token, cookieOptions);
 
     res.status(201).json({
         success: true,
         message: 'User registered successfully',
         newUser,
     });

})

const login =   asyncHandler(  async(req, res, next)=>{
    const {email , password} = req.body;

    if(!email|| !password){
        throw next(new AppError('All fields is required', 404));
    }

    const user = await User.findOne({email}).select('-password');

    if(!user){
        throw next(new AppError('User not exist', 404));
    }

    // Generate JWT token
    const token = await user.generateJETToken();
 
    res.cookie('token', token, cookieOptions);


    res.status(200).json({
        success : true,
        message: 'user login successfully',
        user,
    })
})

const logout =   asyncHandler(  async(req, res, next)=>{
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
})

module.exports = {
    register,
    login,
    logout
}