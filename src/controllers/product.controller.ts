import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { requestHandler } from '../utils/utils';

const createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    const newItem = await requestHandler(productService.createNewProduct(req.body, req.user), next);
    res.send(newItem);
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const items = await requestHandler(productService.getAllProduct(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(items);
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await requestHandler(productService.deleteProductById(req.params.productId), next);
    res.send(deletedProduct);
};

export const productController = {
    createNewProduct,
    getProducts,
    deleteProductById,
};
