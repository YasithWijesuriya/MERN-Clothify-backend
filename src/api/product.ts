import express from 'express';
import isAuthenticated from './middleware/authentication-middleware';
import { getAllProduct,createProduct,getProductById,updateProduct,deleteProduct, uploadProductImage} from '../application/product';
import isAdmin from './middleware/authorization-middleware';

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProduct)
  .post(isAuthenticated, isAdmin, createProduct);

productRouter
.route('/:id')
.get(getProductById)
.put(updateProduct)
.delete(deleteProduct);

productRouter
.route('/images')
.post(uploadProductImage)

export default productRouter;