import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/validate';
import { upload } from '../config/configs';

const productRouter = Router();

productRouter
    .route('/')
    .get(authMiddleware, productController.getProducts)
    .post(authMiddleware, upload('product').single('productImage'), productController.createNewProduct);
productRouter.route('/all').get(authMiddleware, productController.getAllProducts);
productRouter.route('/:productId').delete(authMiddleware, productController.deleteProductById);

export default productRouter;
