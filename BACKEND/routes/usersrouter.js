const express = require('express');
const userrouter = express.Router();
const controllers = require('../controllers/usercontroller');
const { auth, isAdmin } = require('../middleware/auth');    

userrouter.get('/', auth, isAdmin, controllers.getallusers);
userrouter.get('/:id', auth, isAdmin, controllers.getuserbyid);
userrouter.patch('/:id/role', auth, isAdmin, controllers.updaterole);
userrouter.delete('/:id', auth, isAdmin, controllers.deleteuser);



module.exports = userrouter;