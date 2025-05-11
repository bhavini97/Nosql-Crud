const Product = require('../models/product')
const cartService = require("./cart_service");
const mongoose = require('mongoose');

exports.findAllProducts = async () => {
  try {
    const products = await Product.find(); 
    return products;
  } catch (err) {
    throw err;
  }
};

exports.findProductById = async (id) => {
  try {
    const product = await Product.findById(id); 
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (err) {
    throw err;
  }
};

exports.addNewProduct = async (product) => {
  try {
   
    // Check if the product already exists
    const matchProduct = await Product.findOne({
      title: product.title,
      userId: product.userId,
    });

    if (matchProduct) {
      // If product exists, add it to the cart
   
      const addToCart = await cartService.addToCart(matchProduct, product.userId);
      return matchProduct; // Returning the existing product
    }

    // Creating and saving the new product
    const newProduct = new Product(product);
    await newProduct.save(); // Saving the new product to the database

    // Adding the newly added product to the cart
    const addToCart = await cartService.addToCart(newProduct, product.userId);

    return newProduct; // Return the newly added product
  } catch (err) {
    throw new Error('Error adding new product: ' + err.message);
  }
};

exports.updateProduct = async (product, id) => {
 
  try {
    const result = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: product },
      { new: true } // Option to return the updated document
    );
    if (!result) {
    throw new Error('Product not found');
  }

    return result;
  } catch (err) {
    throw err;
  }
};
exports.deleteProduct = async (id) => {
  try{
  const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new Error('Product not found');
    }

    return deletedProduct;
  } catch (err) {
    throw err;
  }
};
