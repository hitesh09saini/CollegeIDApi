const isLoggedIn = require('../middlewares/isLogged.middleware');
const { Router } = require('express')

const { 
    register,
    updateProfile,
    updateFollowing,
    getProfile,
    getAll, } = require('../controllers/studentId.controller');
const upload = require('../middlewares/multer.middleware');
const router = Router();




router.get('/me/:id', isLoggedIn, getProfile);

router.route('/register')
.post(isLoggedIn, upload.single('avatar'), register);

router.route('/update/:id')
.post(isLoggedIn,upload.single('avatar'), updateProfile)

router.route('/following/:myId')
.post(isLoggedIn, updateFollowing)

router.route('/getIDs')
.get(getProfile)

router.route('/getStudents')
.get(getAll)

module.exports = router;