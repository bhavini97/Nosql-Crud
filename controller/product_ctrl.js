const productService = require('../service/product_service');
const Product =  require('../models/product')
const verifyToken = require('../util/jwt');


exports.findAllProducts = async(req,res)=>{
   try{
    const result = await productService.findAllProducts();
    return res.status(200).json(result);

   }catch(err){
      return res.status(500).json(err.message);
   }
}

exports.findProductById = async(req,res)=>{
   const id = req.query.id;
   if(!id){
       return res.status(500).json({message:'id not found'});
   }
   console.log(id)
   try{
      const result = await productService.findProductById(id);
      res.status(200).json(result);
   }catch(err){
       return res.status(500).json(err.message);
   }
}

exports.addNewProduct = async(req,res)=>{
   const userId = verifyToken(req.header('Authorization'))
   if(!userId){
      return res.status(500).json({message:'token not found'})
   }

   const title = req.body.title;
   const price= req.body.price;
   const description = req.body.description;
     if(!title && !price && !description){
      return res.status(500).json({message:'all product parameters should be present'})
    }

   const product = {title,price,description,userId};
   
   try{
     const result = await productService.addNewProduct(product);
     return res.status(200).json(result);
   }catch(err){
       return res.status(500).json(err.message);
   }

}

exports.updateProduct = async(req,res)=>{
   const userId = verifyToken(req.header('Authorization'))
   if(!userId){
      return res.status(500).json({message:'token not found'})
   }
   const title = req.body.title;
   const price= req.body.price;
   const description = req.body.description;
    const id = req.query.id;

    if(!title && !price && !description){
      return res.status(500).json({message:'all product parameters should be present'})
    }

    if(!id){
       return res.status(500).json({message:'id not found'});
   }
   const product = {title,price,description,userId};
   try{
      const result = await productService.updateProduct(product,id);
      res.status(200).json(result);
   }catch(err){
       return res.status(500).json(err.message);
   }
}

exports.deleteProduct = async(req,res)=>{
 const id = req.query.productId;
   if(!id){
       return res.status(500).json({message:'id not found'});
   }
   console.log(id)
   try{
      const result = await productService.deleteProduct(id);
      res.status(200).json(result);
   }catch(err){
       return res.status(500).json(err.message);
   }
}



