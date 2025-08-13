import express from 'express';
import { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory} from '../application/categories';



const categoryRouter = express.Router();

categoryRouter.route('/').get(getAllCategories).post(createCategory);

categoryRouter.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory);


export default categoryRouter;