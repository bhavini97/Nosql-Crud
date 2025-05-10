const routes = require('express').Router();
const productCtrl = require('../controller/product_ctrl');

// find all products
routes.get('/get-products',productCtrl.findAllProducts);

// get product by id.
routes.get('/get-product',productCtrl.findProductById);

// add new product
routes.post('/add-product',productCtrl.addNewProduct);

// edit the already existing folder
routes.put('/edit-product',productCtrl.updateProduct);

// delete the existing product
routes.delete('/delete-product',productCtrl.deleteProduct);


module.exports = routes;