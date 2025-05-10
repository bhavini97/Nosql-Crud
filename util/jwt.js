const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function verifyToken(req,res,next){
    try{
    // extracting token from req.header
    const token = req.header('Authorization').split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token,JWT_SECRET_KEY);
    req.user = decoded;// Attach user data to `req.user`
        next(); // move to next function

    }catch(err){
        return res.status(401).json({ message: "Invalid Token" });
    }

}
