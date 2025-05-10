const {getDb} = require('../util/database');
const { ObjectId } = require('mongodb');

exports.findAllProducts = async()=>{
    const db = getDb().collection('products');
   try{
    const result = await db.find().toArray();
     return result;
   }catch(err){
     throw err;
   }
}

exports.findProductById = async(id)=>{
   const db = getDb().collection('products');
    try{
    const result = await db.findOne({_id:new ObjectId(id)});
     return result;
   }catch(err){
     throw err;
   }
}

exports.addNewProduct = async(product)=>{
    const db = getDb().collection('products');
    try{
     
     const result = await db.insertOne(product);
     const addToCart = await getDb().collection('users').
     return result;
    }catch(err){
      throw err;
    }
}

exports.updateProduct = async(product,id)=>{
   const db = getDb().collection('products');
 

    try{
     const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: product }
    );
     return result;
    }catch(err){
      throw err;
    }
}
exports.deleteProduct = async(id)=>{
   const db = getDb().collection('products');
 
    try{
     const result = await db.deleteOne(
      { _id: new ObjectId(id) },
    );
     return result;
    }catch(err){
      throw err;
    }
}

