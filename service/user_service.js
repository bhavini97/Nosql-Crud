const User = require('../models/user_model');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

exports.addUser = async (user) => {
 
  try {
    const match = await User.findOne({ email: user.email });
    if (match) {
      throw new Error("User with same email already exist");
    }
    //  console.log(user.password)
    const newUser = new User(user);
    const result = await newUser.save();
    return result;
  } catch (err) {
    throw err;
  }
};

exports.loginUser = async (email) => {
  try {
    const match = await User.findOne({ email });
    return match;
  } catch (err) {
    throw err;
  }
};

exports.findUserById = async (id) => {
   try {
    const match = await User.findById(id);
    return match;
  } catch (err) {
    throw err;
  }
};

