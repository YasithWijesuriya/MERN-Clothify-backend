import Review from "../infrastructure/db/entities/review.js";
import product from "../infrastructure/db/entities/product.js";

const createReview = async (req,res)=>{
    try{
        const newReview = req.body;
        const reviews = await Review.create({
            review: req.body.review,
            rating: req.body.rating,
    });

        const products = await product.findById(newReview.productId);
        products.reviews.push(reviews._id);
            await products.save();
            res.status(201).send();
    

    }catch(error){
         res.status(500).json({ message: error.message });
    }
}
const getReview = async (req,res)=>{
    try{
        const productId = req.params.id;
        const products = await product.findById(productId).populate('reviews');
        
        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(products.reviews);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteReview = async(req,res)=>{
    try{
        const reviewId = req.params.id;
        const review = await Review.findByIdAndDelete(reviewId);
        res.status(200).send(review);


    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export {createReview,deleteReview,getReview};