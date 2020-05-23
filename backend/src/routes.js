const express = require('express');
const UserCtrl = require('./controllers/UserCtrl');
const AuthCtrl = require('./controllers/AuthCtrl');
const router = express.Router();

router.post('/user',UserCtrl.store);
router.get('/user/:id',UserCtrl.select);

router.post('/login',AuthCtrl.login);

module.exports = router;