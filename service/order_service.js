const User = require("../models/user_model");
const Order = require("../models/order");
const mongoose = require('mongoose');

exports.createOrder = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    if (!Array.isArray(user.cart) || user.cart.length === 0) {
      throw new Error("Cart is empty");
    }
    const totalOrderPrice = user.cart.reduce(
      (sum, item) => sum + item.totalPrice,0
    );
    
    const orderData = {
      userId,
      products: user.cart,
      totalOrderPrice,
      createdAt: new Date(),
    };
    const order = await Order.create(orderData);

    // Clear user's cart
    user.cart = [];
    await user.save();

    return order;
  } catch (err) {
    throw err;
  }
};

exports.getOrder = async (orderId) => {
   try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order.products;
  } catch (err) {
    throw err;
  }
};
