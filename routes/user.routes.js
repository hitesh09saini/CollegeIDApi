const { Router } = require('express')
const {register, login, logout, forgotPassword, verifyOTP} = require('../controllers/user.controllers')
const router = Router();
const isLoggedIn = require('../middlewares/isLogged.middleware')

router.post('/register', register);
router.post('/login', login);
router.post('/logout',isLoggedIn, logout);
router.post('/sendOTP', forgotPassword)
router.post('/verifyOTP', verifyOTP)


module.exports =  router