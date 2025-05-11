const routes = require('express').Router();
const cartCtrl = require('../controller/cart_ctrl');

routes.delete('/delete-from-cart',cartCtrl.deleteFromCart);

module.exports = routes