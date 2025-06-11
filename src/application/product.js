import product from '../infrastructure/db/entities/product.js';
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";


const getAllProduct = async (req, res, next)=>{
try{
    const categoryID = req.query.categoryID; // query parameter එකෙන් categoryId එක ගන්නවා
    if (categoryID) {
        const products = await product.find({ categoryID });
        res.json(products);
    }else{
        const products = await product.find().populate("reviews");
        res.status(200).json(products);
    }
    
    // .find() function එක asynchronous function එකක් නිසා await use කරලා result එක products variable එකට assign කරලා තියෙයි.

}catch (error) {
   next(error);
   
}
};

const createProduct = async(req, res, next) => {
    
    try {
        const newProduct = req.body;
         if (!newProduct.name) {
            throw new ValidationError("Product name is required");
        }
        if (!newProduct.categoryID) {
            throw new ValidationError("Category ID is required");
        }
        
        const products = await product.create(newProduct);
        res.status(201).json(products);
    } catch (error) {
        next(error);
    }
    
    //මේ await use කරල තියන්නෙ .create() function එක asynchronous function එකක් නිසා.
    // .create() function එක asynchronous function එකක් නිසා await use කරලා result එක products variable එකට assign කරලා තියෙයි.
};

const getProductById = async (req, res, next) => {
  try {
    const products = await product.findById(req.params.id).populate("reviews");

    if (!products) {
      throw new NotFoundError("Product not found");
    }

    res.json(products);
  } catch (error) {
        next(error);
  }
  // .findById() function එක asynchronous function එකක් නිසා await use කරලා result එක product variable එකට assign කරලා තියෙයි.
};


const updateProduct = async (req, res, next)=>{
   
    try{
         const products = await product.findByIdAndUpdate(
            req.params.id, // id එකට අනුව product එක හොයාගන්නවා
            req.body, {   // update කරන්න ඕන product එකේ data
            new: true,    // return the updated document
   });
         if(!products){
        throw new NotFoundError("Product not found");
    }{
        res.status(200).json(products);
    }
    }catch (error) {
        next(error);
    }
    

}

const deleteProduct = async (req, res, next)=>{
    try{
        const products = await product.findByIdAndDelete(req.params.id); 
    if(!products){
        throw new NotFoundError("Product not found");
    }{
        res.status(200).json({ message: "Product deleted successfully" });
    }
    }catch (error) {
        next(error);
    }
}
export {getAllProduct, createProduct, getProductById, updateProduct, deleteProduct};