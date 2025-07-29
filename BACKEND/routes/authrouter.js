const express = require('express');
const router = express.Router();
const controller = require('../controllers/authcontroller');
const {auth} = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me',auth, controller.getcurrentuser);


module.exports = router;
