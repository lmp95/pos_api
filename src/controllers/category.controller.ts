import { Request, Response, NextFunction } from "express";
import { categoryService } from "../services/category.service";
import { requestHandler } from "../utils/utility";

const createCategory = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.createCategory(req.body, req.user), res, next);
};

const getAllCategory = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(
    categoryService.getCategoryList(req.query.search as string, req.query.limit as string, req.query.page as string),
    res,
    next
  );
};

const getCategoryById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.getCategoryById(req.params.categoryId), res, next);
};

const retrieveAllCategory = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.getAllCategory(), res, next);
};

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.updateCategoryById(req.params.categoryId, req.body, req.user), res, next);
};

const deleteCategoryById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.deleteCategoryById(req.params.categoryId), res, next);
};

const getSubCatListById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(categoryService.getSubCategoryById(req.params.categoryId), res, next);
};

export const categoryController = {
  createCategory,
  getAllCategory,
  updateCategory,
  retrieveAllCategory,
  getCategoryById,
  deleteCategoryById,
  getSubCatListById,
};
