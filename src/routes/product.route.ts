import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/validate';

const productRouter = Router();

productRouter.route('/').get(authMiddleware, productController.getProducts).post(authMiddleware, productController.createNewProduct);
productRouter.route('/:productId').delete(authMiddleware, productController.deleteProductById);

export default productRouter;
