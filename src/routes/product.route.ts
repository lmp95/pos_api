import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/validate";
import { upload } from "../config/configs";

const productRouter = Router();

productRouter
  .route("/")
  .all(authMiddleware)
  .get(productController.getProducts)
  .post(upload("product").single("productImage"), productController.createNewBulkProduct);
productRouter.route("/all").all(authMiddleware).get(productController.getAllProducts);
productRouter
  .route("/:productId")
  .all(authMiddleware)
  .get(productController.getProductById)
  .put(upload("product").single("productImage"), productController.updateProductById)
  .delete(productController.deleteProductById);

export default productRouter;
