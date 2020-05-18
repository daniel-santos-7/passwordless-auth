const express = require('express');
const UserCtrl = require('./controllers/UserCtrl');
const router = express.Router();

router.post('/user',UserCtrl.store);
router.get('/user/:id',UserCtrl.select);

module.exports = router;