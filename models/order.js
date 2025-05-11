class Order {
  constructor(userId, products, totalOrderPrice) {
    this.userId = userId;
    this.products = products; // array of cart items
    this.totalOrderPrice = totalOrderPrice; // sum of totalPrice of all cart items
    this.createdAt = new Date(); // time at which order was created
  }
}

module.exports = Order;
