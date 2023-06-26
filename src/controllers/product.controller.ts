import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { requestHandler } from '../utils/utility';

const createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await requestHandler(productService.createNewProduct(req.file, req.body, req.user), next);
    res.send(newProduct);
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const products = await requestHandler(
        productService.getAllProductWithPagination(filter as string, req.query.limit as string, req.query.page as string),
        next
    );
    res.send(products);
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await requestHandler(productService.deleteProductById(req.params.productId), next);
    res.send(deletedProduct);
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const products = await requestHandler(productService.getAllProduct(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(products);
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const product = await requestHandler(productService.getProductById(req.params.productId), next);
    res.send(product);
};

const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const product = await requestHandler(productService.updateProductById(req.file, req.params.productId, req.body, req.user), next);
    res.send(product);
};

export const productController = {
    createNewProduct,
    getProducts,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
};
