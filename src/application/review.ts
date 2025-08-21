import mongoose from "mongoose";
import Review from "../infrastructure/db/entities/Review";
import product from "../infrastructure/db/entities/Product";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import ForbiddenError from "../domain/errors/forbidden-error";
import { Request, Response, NextFunction } from "express";
import { CreateReviewDTO } from "../domain/errors/DTO/review";
import { getAuth, clerkClient } from "@clerk/express";

const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}


const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    if (!auth?.userId) //!Clerk generate කරන unique ID
         throw new ForbiddenError("You do not have permission to create a review");


    const parsed = CreateReviewDTO.safeParse(req.body); //!createReviewDTO -> Zod schema එක (input validation)
    if (!parsed.success) throw new ValidationError(parsed.error.message);
    const { productId, review, rating } = parsed.data;

    // 1) product validate
    const prod = await product.findById(productId);
    if (!prod) throw new NotFoundError("Product not found");

    // 2) Clerk display name
    const u = await clerkClient.users.getUser(auth.userId); 
    //!clerkClient.users.getUser() → Clerk DB එකෙන් real user object එක ගන්නවා.
    const displayName =
      u.fullName || u.username || u.primaryEmailAddress?.emailAddress || "User"; // "User is default value"

    // 3) review create
    const reviewDoc = await Review.create({
      userId: auth.userId,
      user: displayName,          // <-- auto name from Clerk
      review,
      rating,
      productId,
    });

    // 4) link to product
    prod.reviews.push(reviewDoc._id);
    await prod.save();

    return res.status(201).json(reviewDoc); //! frontend එක refresh කරන්න ලේසි වෙනවා
 

 
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
};
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


const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    if (!auth?.userId)
         throw new ForbiddenError("You do not have permission to delete a review");

    const review = await Review.findById(req.params.id); //!url එකේ reviewID එක පාස් වෙනවා ඒක අරගෙන ඊට අදාල object එක review එකට assign කරගන්නවා.
    if (!review) 
        throw new NotFoundError("Review not found");

    // owner only
    if (review.userId !== auth.userId) {
      throw new ForbiddenError("You do not have permission to delete this review");
    }

    // remove from product.reviews
    if (review.productId) {
      await product.findByIdAndUpdate( //!මේ review එකට අදාල product එක DB එකෙන් id එකෙන් ගන්නවා.
        review.productId,
        { $pull: { reviews: new mongoose.Types.ObjectId(review._id) } }, //!$pull operator එක use කරලා reviews array එකෙන් remove කරනවා.ඒ කියන්නෙ product එකෙනුත් අයින් වෙලා යනවා.
        { new: true } //!update වෙලා තියෙන latest product document එක return කරන්න කියන option එක.
      );
    }

    await review.deleteOne(); //!  Review document එකම DB එකෙන් delete කරනවා.
    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export { createReview, deleteReview, getReview, getAllReviews };