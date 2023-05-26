import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';
import { requestHandler } from '../utils/utils';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = await requestHandler(categoryService.createCategory(req.body, req.user), next);
    res.send(newCategory);
};

const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryList = await requestHandler(categoryService.getCategoryList(req.query.limit as string, req.query.page as string), next);
    res.send(categoryList);
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const category = await requestHandler(categoryService.getCategoryById(req.params.categoryId), next);
    res.send(category);
};

const retrieveAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryList = await requestHandler(categoryService.getAllCategory(), next);
    res.send(categoryList);
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryList = await requestHandler(categoryService.updateCategoryById(req.params.categoryId, req.body, req.user), next);
    res.send(categoryList);
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const deletedCategory = await requestHandler(categoryService.deleteCategoryById(req.params.categoryId), next);
    res.send(deletedCategory);
};

export const categoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    retrieveAllCategory,
    getCategoryById,
    deleteCategoryById,
};
