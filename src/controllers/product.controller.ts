import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { requestHandler } from '../utils/utility';

const createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    const newItem = await requestHandler(productService.createNewProduct(req.file, req.body, req.user), next);
    res.send(newItem);
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const items = await requestHandler(productService.getAllProductWithPagination(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(items);
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await requestHandler(productService.deleteProductById(req.params.productId), next);
    res.send(deletedProduct);
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const items = await requestHandler(productService.getAllProduct(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(items);
};

export const productController = {
    createNewProduct,
    getProducts,
    deleteProductById,
    getAllProducts,
};
