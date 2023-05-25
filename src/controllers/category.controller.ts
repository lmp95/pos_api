import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCategory = await categoryService.createCategory(req.body, req.user);
        res.send(newCategory);
    } catch (error) {
        next(error);
    }
};

const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryList = await categoryService.getCategoryList(req.query.limit as string, req.query.page as string);
        res.send(categoryList);
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.getCategoryById(req.params.categoryId);
        res.send(category);
    } catch (error) {
        next(error);
    }
};

const retrieveAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryList = await categoryService.getAllCategory();
        res.send(categoryList);
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryList = await categoryService.updateCategoryById(req.params.categoryId, req.body, req.user);
        res.send(categoryList);
    } catch (error) {
        next(error);
    }
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedCategory = await categoryService.deleteCategoryById(req.params.categoryId);
        res.send(deletedCategory);
    } catch (error) {
        next(error);
    }
};

export const categoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    retrieveAllCategory,
    getCategoryById,
    deleteCategoryById,
};
