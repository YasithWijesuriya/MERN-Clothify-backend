import express from 'express';
import isAuthenticated from './middleware/authentication-middleware';
import isAdmin from './middleware/authorization-middleware';
import { getAllColors, createColor, getColorById, updateColor, deleteColor } from '../application/color';

const colorRouter = express.Router();


colorRouter
    .route("/")
    .get(getAllColors)
    .post(isAuthenticated, isAdmin, createColor);  

// Specific color routes
colorRouter
    .route('/:id')
    .get(getColorById) 
    .put(isAuthenticated, isAdmin, updateColor) 
    .delete(isAuthenticated, isAdmin, deleteColor); 
export default colorRouter; 