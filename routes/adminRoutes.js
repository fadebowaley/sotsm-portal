// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


//router.get('/', userController.getRegisterationForm);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);


module.exports = router;
