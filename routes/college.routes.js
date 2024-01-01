const {Router} = require('express')
const {register, addBranch, getAll} = require('../controllers/College.controllers')
const upload = require('../middlewares/multer.middleware');
const isLoggedIn = require('../middlewares/isLogged.middleware')
const router = Router();

router.route('/register')
.post(isLoggedIn, upload.single('logo'), register);

router.route('/:id/branch')
.post(isLoggedIn, addBranch)

router.route('/all')
.get(getAll)

module.exports =  router