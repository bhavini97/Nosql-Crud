const User = require('../models/user_model'); 
const userService = require('./user_service');
const mongoose = require('mongoose');

exports.addToCart = async (product, userId) => {
  try {

    const user = await User.findById(userId);
   
    if (!user) {throw new Error("User not found");}

    if (!product._id) throw new Error("Product ID missing in addToCart");

    const productIdStr = product._id.toString();
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productIdStr
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.productPrice * existingItem.quantity;
    } else {
      user.cart.push({
        productId: product._id,
        quantity: 1,
        productPrice: product.price,
        totalPrice: product.price,
      });
    }

    const result = await user.save();
    return result;
  } catch (err) {
    throw err;
  }
};
exports.deleteFromCart = async (userId, productId) => {
  try {

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const productIdStr = productId.toString();
    const index = user.cart.findIndex(
      (item) => item.productId.toString() === productIdStr
    );

    if (index !== -1) {
      user.cart[index].quantity -= 1;

      if (user.cart[index].quantity <= 0) {
        user.cart.splice(index, 1);
      } else {
        user.cart[index].totalPrice =
          user.cart[index].quantity * user.cart[index].productPrice;
      }

      const result = await user.save();
      return result;
    } else {
      throw new Error("Product not found in cart");
    }
  } catch (err) {
    throw err;
  }
};
