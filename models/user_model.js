const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  productPrice: { type: Number },
  totalPrice: { type: Number }
}, { _id: false }); // to prevent automatic _id for each item

const userSchema = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart:     { type: [cartItemSchema], default: [] }
});


module.exports = mongoose.model('User', userSchema);
