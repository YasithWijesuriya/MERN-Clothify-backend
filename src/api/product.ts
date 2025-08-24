import express from 'express';
import { getAllProduct,createProduct,getProductById,updateProduct,deleteProduct, uploadProductImage} from '../application/product';
import { isAuthenticated } from '../api/middleware/authentication-middleware';
import { isAdmin } from '../api/middleware/authorization-middleware';

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProduct)
  .post(isAuthenticated, isAdmin, createProduct);

productRouter
.route('/:id')
.get(getProductById)
.put(updateProduct)
.delete(isAuthenticated, isAdmin, deleteProduct);

productRouter
.route('/images')
.post(uploadProductImage)

export default productRouter;