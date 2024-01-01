const { Router } = require('express')
const {register, login, logout} = require('../controllers/user.controllers')
const router = Router();
const isLoggedIn = require('../middlewares/isLogged.middleware')

router.post('/register', register);
router.post('/login', login);
router.post('/logout',isLoggedIn, logout);

module.exports =  router