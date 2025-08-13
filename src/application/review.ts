import Review from "../infrastructure/db/entities/Review";
import product from "../infrastructure/db/entities/Product";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { Request, Response, NextFunction } from "express";
import { CreateReviewDTO } from "../domain/errors/DTO/review";

const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}


const createReview = async (req:Request , res:Response ,next:NextFunction)=>{
    try{
        const parsed = CreateReviewDTO.safeParse(req.body);
        if (!parsed.success) {
          // You can throw a ValidationError or return a response with the error details
          throw new ValidationError(parsed.error.message);
        }
        const newReview = parsed.data;

        const Reviews = await Review.create({
            user:req.body.user,
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
      /*      
      1. newReview කියල variable එකක් හදාගෙන එයට අප postmon මගින් request කර එහි json body එක තුල තිබෙන 
       data ටික එයට assign කරගන්නවා. 
      2."Review" කියන mongoose model එකට ඒ කියන්නෙ එයද "Reviews" කියන db collection එකට සමාන උන varible එකක්
      review ,rating කියන object ප්මනක් save කරන්න සෑදීම.මන්ද අපි json body එක තුල productId එකද යවයි.
      3.දැන් අපි යවන json body එකේ productId එකට අදාල product එක හොයාගෙන එය products කියන variable 
      එකට සමාන කරගන්නවා.
      4.දැන් ඒ products variable එකට එනම් හොයාගන්නා ලද product එකට Reviews  කියන variable එකේ data වල 
      ඉබේම හැදෙන්න සැලස්වූ id එක append කරනවා.
      5.await products.save(); මෙයින් අලුත් update එක save කරනවා.
      6. res.status(201).send(); sends an HTTP response to the client with a status code of 201, which means "Created". It indicates that a new resource (in this case, a review) was successfully created.
*/
    }catch(error){
        next(error);
    }
}
const getReview = async (req:Request , res:Response ,next:NextFunction)=>{
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


const deleteReview = async(req:Request , res:Response ,next:NextFunction)=>{
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

export {createReview,deleteReview,getReview,getAllReviews};