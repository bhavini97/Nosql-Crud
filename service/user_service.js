const {getDb} = require('../util/database');
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");


exports.addUser = async(user)=>{
     const db = getDb().collection('users');
     try{
     const match = await db.findOne({email:user.email});
     if(match){
        throw new Error('User with same email already exist');
     }
    //  console.log(user.password)
    const hashedPassword = await bcrypt.hash(String(user.password), 10);
    user.password = hashedPassword;
     const result = await db.insertOne(user);
     return result;
    }catch(err){
      throw err;
    }
}

exports.loginUser = async(email)=>{
     const db = getDb().collection('users');
     try{
     const match = await db.findOne({
        email:email,
     });
     return match;
    }catch(err){
      throw err;
    }
     
}

exports.findUserById = async(id)=>{
   const db = getDb().collection('users');
     try{
     const match = await db.findOne({
        _id: new ObjectId(id),
     });
     return match;
    }catch(err){
      throw err;
    }
}