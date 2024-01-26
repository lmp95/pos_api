import { NextFunction, Request, Response } from "express";
import { productService } from "../services/product.service";
import { requestHandler } from "../utils/utility";

const createNewProduct = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(productService.createNewProduct(req.file, req.body, req.user), res, next);
};

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const filter = req.query.filter?.toString();
  const search = req.query.search?.toString();
  requestHandler(
    productService.getAllProductWithPagination(
      search as string,
      filter as string,
      req.query.limit as string,
      req.query.page as string
    ),
    res,
    next
  );
};

const deleteProductById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(productService.deleteProductById(req.params.productId), res, next);
};

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
  const filter = req.query.filter?.toString();
  requestHandler(
    productService.getAllProduct(filter as string, req.query.limit as string, req.query.page as string),
    res,
    next
  );
};

const getProductById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(productService.getProductById(req.params.productId), res, next);
};

const updateProductById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(productService.updateProductById(req.file, req.params.productId, req.body, req.user), res, next);
};

export const productController = {
  createNewProduct,
  getProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
};
