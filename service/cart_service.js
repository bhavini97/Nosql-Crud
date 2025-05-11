const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
const userService = require("./user_service");

exports.addToCart = async (product, userId) => {
  const db = getDb().collection("users");
  try {
    console.log(product);
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Initialize cart if it's not set or not an array
    //console.log(user);
    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }
    if (!product._id) {
      throw new Error("Product ID missing in addToCart");
    }
    let existingItem;
    if (user.cart.length > 0) {
      existingItem = user.cart.find(
        (item) => item.productId.toString() === product._id.toString()
      );
    }

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId: product._id, quantity: 1 });
    }

    const result = await db.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { cart: user.cart } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteFromCart = async (userId,productId) => {
     const db = getDb().collection("users");
  productId = new ObjectId(productId);
  userId = new ObjectId(userId);
  try {
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    let existingItem;
    if (user.cart.length > 0) {
      const existingItemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItemIndex !== -1) {
        user.cart[existingItemIndex].quantity -= 1;

        if (user.cart[existingItemIndex].quantity <= 0) {
          // Remove the item from cart
          user.cart.splice(existingItemIndex, 1);
        }
        const result = await db.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { cart: user.cart } }
    );
    return result;

      }
    }else{
        throw new Error(`Cart doesn't exist`);
    }
  } catch (err) {
    throw err;
  }
};
