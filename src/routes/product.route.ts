import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/validate";

const productRouter = Router();

productRouter
  .route("/")
  .all(authMiddleware)
  .get(productController.getProducts)
  .post(productController.createNewBulkProduct);
productRouter.route("/all").all(authMiddleware).get(productController.getAllProducts);
productRouter
  .route("/:productId")
  .all(authMiddleware)
  .get(productController.getProductById)
  .put(productController.updateProductById)
  .delete(productController.deleteProductById);

export default productRouter;
