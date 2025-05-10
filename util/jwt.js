const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function verifyToken(tokenFromHeader){
    try{
    // extracting token from req.header
    
    const token = tokenFromHeader.split(" ")[1];
    if(!token){
        throw new Error('token not found')
    }

    const decoded = jwt.verify(token,JWT_SECRET_KEY);
     return decoded.userId;
    }catch(err){
        throw err;
    }

}

module.exports = verifyToken;
