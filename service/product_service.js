const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
const cartService = require("./cart_service");

exports.findAllProducts = async () => {
  const db = getDb().collection("products");
  try {
    const result = await db.find().toArray();
    return result;
  } catch (err) {
    throw err;
  }
};

exports.findProductById = async (id) => {
  const db = getDb().collection("products");
  try {
    const result = await db.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
};

exports.addNewProduct = async (product) => {
  const db = getDb().collection("products");
  try {
    product.userId = new ObjectId(product.userId);
    //console.log(product.userId);
    const matchProduct = await db.findOne({
      title: product.title,
      userId: product.userId,
    });

    if (matchProduct) {
      const addToCart = await cartService.addToCart(
        matchProduct,
        product.userId
      );
      return matchProduct;
    }
    const insertedProduct = await db.insertOne(product);
    // constructing a proper product object with _id
    const fullProduct = {
      ...product,
      _id: insertedProduct.insertedId,
    };

    const addToCart = await cartService.addToCart(fullProduct, product.userId);
    return insertedProduct;
  } catch (err) {
    throw err;
  }
};

exports.updateProduct = async (product, id) => {
  const db = getDb().collection("products");

  try {
    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: product }
    );
    return result;
  } catch (err) {
    throw err;
  }
};
exports.deleteProduct = async (id) => {
  const db = getDb().collection("products");

  try {
    const result = await db.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
};
