const { Router } = require('express')
const {register, login, logout, forgotPassword, verifyOTP, isLogin} = require('../controllers/user.controllers')
const router = Router();
const isLoggedIn = require('../middlewares/isLogged.middleware')

router.post('/register', register);
router.post('/login', login);
router.post('/logout',isLoggedIn, logout);

router.post('/sendOTP', forgotPassword)
router.post('/verifyOTP', verifyOTP)

// check is loggedin
router.get('/', isLoggedIn, isLogin)

module.exports =  router