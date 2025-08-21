import express from 'express';
import { getReview,createReview,deleteReview, getAllReviews } from '../application/review';
import isAuthenticated from './middleware/authentication-middleware';

const reviewRouter = express.Router();


reviewRouter.route('/').get(getAllReviews).post(isAuthenticated, createReview);
reviewRouter.route('/:id').get(getReview).delete(isAuthenticated, deleteReview);

// reviewRouter.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default reviewRouter;