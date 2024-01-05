const express = require('express');
const router = express.Router();
const catchAsync = require('../Utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controller/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.userRegister));

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.userLogin);

router.get('/logout', users.userLogout);

module.exports = router;