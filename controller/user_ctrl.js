const userService = require("../service/user_service");
const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.addNewUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!username && !email && !password) {
    return res
      .status(500)
      .json({ message: "all product parameters should be present" });
  }
  const user = new User(username, email, password);
  try {
    const result = await userService.addUser(user);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email && !password) {
    return res
      .status(500)
      .json({ message: "all product parameters should be present" });
  }
  try {
    const user = await userService.loginUser(email);

    //user with entered email address not found
    if (!user) {
      return res.status(401).json({ message: "unregistered email address" });
    }

    // verify entered password with db password
    const match = await bcrypt.compare(String(password), user.password);
    if (!match) {
      return res.status(402).json({ message: "invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.findUserById = async(req,res)=>{
    const id = req.query.id;
       if(!id){
           return res.status(500).json({message:'id not found'});
       }
       try{
          const result = await userService.findUserById(id);
          if(!result){
            return res.status(400).json({message:'No user found'});
          }
          return  res.status(200).json(result);
       }catch(err){
           return res.status(500).json(err.message);
       }
}
