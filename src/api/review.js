import express from 'express';
import { getReview,createReview,deleteReview } from '../application/review.js';

const reviewRouter = express.Router();


reviewRouter.route('/').post(createReview);
reviewRouter.route('/:id').get(getReview).delete(deleteReview)

// reviewRouter.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default reviewRouter;