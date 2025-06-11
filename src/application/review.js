import Review from "../infrastructure/db/entities/review.js";
import product from "../infrastructure/db/entities/product.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

const createReview = async (req,res,next)=>{
    try{
        const newReview = req.body;
         if (!newReview.review) {
            throw new ValidationError("Review text is required");
        }
        if (!newReview.rating) {
            throw new ValidationError("Rating is required");
        }
        if (!newReview.productId) {
            throw new ValidationError("Product ID is required");
        }
        const Reviews = await Review.create({
            review: req.body.review,
            rating: req.body.rating,
    });

        const products = await product.findById(newReview.productId);
        if (!products) {
            throw new NotFoundError("Product not found");
        }
        products.reviews.push(Reviews._id);
            await products.save();
            res.status(201).send();
            
      //1. newReview කියල variable එකක් හදාගෙන එයට අප postmon මගින් request කර එහි json body එක තුල තිබෙන 
      // data ටික එයට assign කරගන්නවා. 
      //2."Review" කියන mongoose model එකට ඒ කියන්නෙ එයද "Reviews" කියන db collection එකට සමාන උන varible එකක්
      //review ,rating කියන object ප්මනක් save කරන්න සෑදීම.මන්ද අපි json body එක තුල productId එකද යවයි.
      //3.දැන් අපි යවන json body එකේ productId එකට අදාල product එක හොයාගෙන එය products කියන variable 
      //එකට සමාන කරගන්නවා.
      //4.දැන් ඒ products variable එකට එනම් හොයාගන්නා ලද product එකට Reviews  කියන variable එකේ data වල 
      //ඉබේම හැදෙන්න සැලස්වූ id එක append කරනවා.
      //5.await products.save(); මෙයින් අලුත් update එක save කරනවා.
      //6. res.status(201).send(); sends an HTTP response to the client with a status code of 201, which means "Created". It indicates that a new resource (in this case, a review) was successfully created.

    }catch(error){
        next(error);
    }
}
const getReview = async (req,res,next)=>{
    try{
        const productId = req.params.id;
        const products = await product.findById(productId).populate('reviews');
        
        if (!products) {
            throw new NotFoundError("Product not found");
        }

        res.status(200).json(products.reviews);
    }catch(error){
        next(error);
    }
}

const deleteReview = async(req,res,next)=>{
    try{
        const reviewId = req.params.id;
        const review = await Review.findByIdAndDelete(reviewId);
         if (!review) {
            throw new NotFoundError("Review not found");
        }
        res.status(200).send(review);


    }catch(error){
        next(error);
    }
}

export {createReview,deleteReview,getReview};