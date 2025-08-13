import express from 'express';
import { getReview,createReview,deleteReview, getAllReviews } from '../application/review';

const reviewRouter = express.Router();


reviewRouter.route('/').get(getAllReviews).post(createReview);
reviewRouter.route('/:id').get(getReview).delete(deleteReview)

// reviewRouter.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default reviewRouter;