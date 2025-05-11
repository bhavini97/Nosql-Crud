const orderService = require('../service/order_service');
const verifyToken = require('../util/jwt');

exports.createOrder = async(req,res)=>{
     const userId = verifyToken(req.header('Authorization'))
   if(!userId){
      return res.status(500).json({message:'token not found'})
   }
   try{
     const result = await orderService.createOrder(userId);
       return res.status(200).json({result});
   }catch(err){
    return res.status(500).json(err.message);
   }
}

exports.getOrder = async(req,res)=>{
    const orderId = req.query.orderId;
    console.log(orderId)
    try{
     const orders = await orderService.getOrder(orderId);
     console.log(orders);
     return res.status(200).json({orders});
    }catch(err){
      return res.status(500).json(err.message);
    }
}