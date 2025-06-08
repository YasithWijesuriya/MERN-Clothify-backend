import product from '../infrastructure/db/entities/product.js';

const getAllProduct = async (req,res)=>{
try{
    const categoryID = req.query.categoryID; // query parameter එකෙන් categoryId එක ගන්නවා
    if (categoryID) {
        const products = await product.find({ categoryID });
        res.json(products);
    }else{
        const products = await product.find();
        res.status(200).json(products);
    }
    
    // .find() function එක asynchronous function එකක් නිසා await use කරලා result එක products variable එකට assign කරලා තියෙයි.

}catch (error) {
    res.status(500).json({ message: error.message });
   
}
};

const createProduct = async(req, res) => {
    const newProduct = req.body;
    try {
        const products = await product.create(newProduct);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    //මේ await use කරල තියන්නෙ .create() function එක asynchronous function එකක් නිසා.
    // .create() function එක asynchronous function එකක් නිසා await use කරලා result එක products variable එකට assign කරලා තියෙයි.
};

const getProductById = async (req, res) => {
  try {
    const products = await product.findById(req.params.id).populate("categoryID");

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // .findById() function එක asynchronous function එකක් නිසා await use කරලා result එක product variable එකට assign කරලා තියෙයි.
};


const updateProduct = async (req,res)=>{
   
    try{
         const products = await product.findByIdAndUpdate(
            req.params.id, // id එකට අනුව product එක හොයාගන්නවා
            req.body, {   // update කරන්න ඕන product එකේ data
            new: true,    // return the updated document
   });
         if(!products){
        res.status(404).json(
            {message:"Product not found"}
        );
    }{
        res.status(200).json(products);
    }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
    

}

const deleteProduct = async (req,res)=>{
    try{
        const products = await product.findByIdAndDelete(req.params.id); 
    if(!products){
        res.status(404).json(
            {message:"Product not found"}
        );
    }{
        res.status(200).json({ message: "Product deleted successfully" });
    }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export {getAllProduct, createProduct, getProductById, updateProduct, deleteProduct};