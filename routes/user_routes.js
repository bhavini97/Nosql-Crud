const routes = require('express').Router();
const userCtrl = require('../controller/user_ctrl');

// adding new user
routes.post('/add-user',userCtrl.addNewUser);

// login user
routes.post('/login',userCtrl.loginUser);

// find user by id
routes.get('/find-user',userCtrl.findUserById);


module.exports = routes;