import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/validate";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(authMiddleware, categoryController.getAllCategory)
  .post(authMiddleware, categoryController.createCategory);
categoryRouter.route("/all").get(authMiddleware, categoryController.retrieveAllCategory);
categoryRouter
  .route("/:categoryId")
  .all(authMiddleware)
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategoryById);
categoryRouter.route("/:categoryId/subcategory").all(authMiddleware).get(categoryController.getSubCatListById);

export default categoryRouter;
