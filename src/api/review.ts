import express from 'express';
import { getReview,createReview,deleteReview, getAllReviews } from '../application/review';
import { isAuthenticated } from '../api/middleware/authentication-middleware';


const reviewRouter = express.Router();


reviewRouter.route('/')
  .get(getAllReviews)
  .post(isAuthenticated, createReview);

reviewRouter.route('/:id')
  .get(getReview)
  .delete(isAuthenticated, deleteReview);


export default reviewRouter;