require('dotenv').config({
    path: '../.env'
});

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill in a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    collegeIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],

    forgotPasswordExpiry: String,
    forgotPasswordOTP: String,

}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next();
})

userSchema.methods = {
    generateJETToken: async function () {
        const token = jwt.sign({ _id: this._id, email: this.email, username: this.username }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
        return token;
    },

    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generateOTP: function () {
        return new Promise((resolve, reject) => {
            this.forgotPasswordOTP = Math.floor(1000 + Math.random() * 9000).toString();
            this.forgotPasswordExpiry = Date.now() + 3 * 60 * 1000;

            this.save()
            .then(() => {
                resolve(this.forgotPasswordOTP);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    

    verifyOTP: function (userEnteredOTP) {
        if (userEnteredOTP === this.forgotPasswordOTP) {
            
            if (Date.now() <= this.forgotPasswordExpiry) {
            
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

}


const User = model('Users', userSchema);

module.exports = User
