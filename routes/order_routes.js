const routes = require('express').Router();
const orderController = require('../controller/order_ctrl');

routes.post('/create-order',orderController.createOrder);
routes.get('/show-order',orderController.getOrder);

module.exports=routes;