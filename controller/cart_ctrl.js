const cartService = require("../service/cart_service");
const verifyToken = require('../util/jwt');


exports.deleteFromCart = async(req,res)=>{
    const userId = verifyToken(req.header('Authorization'))
   if(!userId){
      return res.status(500).json({message:'token not found'})
   }
   const productId = req.query.productId;
   try{
     const result = await cartService.deleteFromCart(userId,productId);
     return res.status(200).json({message:'product deleted from cart'})
   }catch(err){
      return res.status(500).json({message:err.message});
   }
}