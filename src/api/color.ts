import express from 'express';
import { isAuthenticated } from '../api/middleware/authentication-middleware';
import { isAdmin } from '../api/middleware/authorization-middleware';
import { getAllColors, createColor, getColorById, updateColor, deleteColor } from '../application/color';

const colorRouter = express.Router();

colorRouter
  .route("/")
  .get(getAllColors)
  .post(createColor);

colorRouter
  .route('/:id')
  .get(getColorById)
  .put(isAuthenticated, isAdmin, updateColor)
  .delete(isAuthenticated, isAdmin, deleteColor);

export default colorRouter;
