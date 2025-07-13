import express from 'express';
import { getAllProduct,createProduct,getProductById,updateProduct,deleteProduct } from '../application/product';

const productRouter = express.Router();

productRouter.route('/').get(getAllProduct).post(createProduct);

productRouter.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default productRouter;