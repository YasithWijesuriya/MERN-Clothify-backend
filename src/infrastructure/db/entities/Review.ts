import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
},     // Clerk user id
  user:   { 
    type: String, 
    required: true 
},     // Display name (from Clerk)
  review: { 
    type: String, 
    required: true 
},
  rating: { 
    type: Number, 
    required: true, min:1, max:5 
},
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'product', required: true 
    },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
