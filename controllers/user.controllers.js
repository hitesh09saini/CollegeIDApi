const User = require('../models/user.models')
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const AppError = require('../utils/error.utils')
const sendEmail = require('../utils/mail.utils')
const {generateMessage, generateMessagePass}= require('../utils/generateMessage')


const cookieOptions = {
    maxAge: 3 * 24 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
};

const register = asyncHandler(async (req, res, next) => {
    let { email, password, username, name } = req.body.user;

    if (!email || !password || !username || !name) {
        throw next(new AppError('All fields is required', 404));
    }

    const user = await User.findOne({ email });

    if (user) {
        throw next(new AppError('Email Already exist', 404));
    }

    const newUser = await User({
        email,
        password,
        username,
        name
    })

    // Save the user to the database
    await newUser.save();

    const token = await newUser.generateJETToken();

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        newUser,
    });
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body.user;

    if (!email || !password) {
        throw next(new AppError('All fields is required', 404));
    }

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
        throw next(new AppError('User not exist', 404));
    }

    // Generate JWT token
    const token = await user.generateJETToken();

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'user login successfully',
        user,
    })
})

const logout = asyncHandler(async (req, res, next) => {
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

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        throw next(new AppError('E-mail field is required', 404));
    }

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
        throw next(new AppError('User not exist', 404));
    }

    const subject = 'CollegeID Forgot Password OTP'

    const otp = await user.generateOTP();
    const message = generateMessage(otp);
    await sendEmail(email, subject, message);

    res.status(200).json({
        success: true,
        message: 'Send OTP successfully',
    })
})

const verifyOTP = asyncHandler(
    async (req, res, next) => {

        const { email, otp, password } = req.body.user;

        if (!email) {
            throw next(new AppError('E-mail field is required', 404));
        }
        const user = await User.findOne({ email }).select('-password');

        if (!user) {
            throw next(new AppError('User not exist', 404));
        }

        const verifyOTP = await user.verifyOTP(otp);

        if (!verifyOTP) {
            throw next(new AppError('OTP is not valid', 404));
        }

        if (password) {
            user.password = password;
            await user.save();
            const subject = 'Password change successfully'
            const message = generateMessagePass(user);
            await sendEmail(email, subject, message);

            return res.status(200).json({
                success: true,
                message: 'Password change succesfully',  // Update the message
                user,
            });
        }

        const token = await user.generateJETToken();
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'Verification successful',  // Update the message
            user,
        });
    }
)

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    verifyOTP
}