const express = require('express');
const UserCtrl = require('./controllers/UserCtrl');
const AuthCtrl = require('./controllers/AuthCtrl');
const authMiddlewares = require('./middlewares/auth');

const router = express.Router();

router.post('/user',UserCtrl.store);
router.get('/user', authMiddlewares.tokenValidation,UserCtrl.select);

router.post('/login',AuthCtrl.login);
router.get('/auth', authMiddlewares.tokenValidation,AuthCtrl.auth);

module.exports = router;