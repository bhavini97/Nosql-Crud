const userService = require("../service/user_service");
const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
const Order = require('../models/order');

exports.createOrder = async (userId) => {
  userId = new ObjectId(userId);
  const db = getDb();
  const usersCollection = db.collection("users");
  const ordersCollection = db.collection("orders");

  try {
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    if (!Array.isArray(user.cart) || user.cart.length === 0) {
      throw new Error("Cart is empty");
    }
    const order = {
      userId,
      products: user.cart,
      createdAt: new Date(),
      totalOrderPrice: user.cart.reduce(
        (sum, item) => sum + item.totalPrice,0),
    };
    const insertedOrder = await ordersCollection.insertOne(order);

    // Clearing  the user's cart after order placement
    await usersCollection.updateOne(
      { _id: userId },
      { $set: { cart: [] } }
    );

    return insertedOrder;
    
  } catch (err) {
    throw err;
  }
};

exports.getOrder = async(orderId)=>{
    orderId = new ObjectId(orderId);
     const db = getDb();
     const ordersCollection = db.collection("orders");
    try{
        const order = await ordersCollection.findOne({_id:orderId});
        return order.products;
    }catch(err){
       throw err;
    }
}
