import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';

const createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newItem = await productService.createNewProduct(req.body, req.user);
        res.send(newItem);
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query.filter?.toString();
        const items = await productService.getAllProduct(filter as string, req.query.limit as string, req.query.page as string);
        res.send(items);
    } catch (error) {
        next(error);
    }
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedProduct = productService.deleteProductById(req.params.productId);
        res.send(deletedProduct);
    } catch (error) {
        next(error);
    }
};

export const productController = {
    createNewProduct,
    getProducts,
    deleteProductById,
};
