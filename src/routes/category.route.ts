import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/validate";

const categoryRouter = Router();

categoryRouter.route('/').get(authMiddleware, categoryController.getAllCategory).post(authMiddleware, categoryController.createCategory);
categoryRouter.route('/:categoryId').post(authMiddleware, categoryController.updateCategory);

export default categoryRouter;