import httpStatus from 'http-status';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { ProductInterface } from '../interfaces/product.interface';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';
import { categoryService } from './category.service';
import ProductModel from '../models/product.model';
import { Types } from 'mongoose';
import { ProductQuery } from '../queries/Product.query';
import { fileRemove } from '../utils/utility';

/**
 * Create new item
 * @param {newProduct} newProduct
 * @param {user} user
 * @returns {Promise<ProductInterface>}
 */
const createNewProduct = async (image: Express.Multer.File, newProduct: ProductInterface, user: UserInterface | any) => {
    if (!newProduct?.categoryId) {
        fileRemove(image.path);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category is required');
    }
    const category = await categoryService.checkCategoryExist(newProduct?.categoryId?.toString());
    if (category)
        return await ProductModel.create({
            ...newProduct,
            image: image?.filename,
            path: image?.destination.replace(/\.\/public/, ''),
            createdBy: user.username,
            createdDate: new Date(),
            updatedBy: user.username,
            updatedDate: new Date(),
        });
    else {
        fileRemove(image.path);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create item');
    }
};

/**
 * get category total count
 * @returns {Promise<number>}
 */
const getProductTotalCount = async (matchQuery?: object): Promise<number> => {
    const result = await ProductModel.aggregate([
        {
            $match: matchQuery || {},
        },
        {
            $count: 'total',
        },
    ]);
    return result[0]?.total;
};

/**
 * Get all products with pagination
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllProductWithPagination = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    const matchQuery = {};
    // if (filter) {
    //     objectIds = filter.split(',').map((id) => new Types.ObjectId(id));
    //     matchQuery = {
    //         categoryId: {
    //             $in: objectIds,
    //         },
    //     };
    // }

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([getProductTotalCount(), ProductModel.aggregate([...ProductQuery(matchQuery, { _id: -1 }, perPage, currentPage)])]).then((values) => {
        data = {
            data: values[1],
            page: currentPage,
            perPage: perPage,
            total: values[0],
        };
    });
    return data;
};

/**
 * Get all items
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllProduct = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    let objectIds = [];
    let matchQuery = {};
    if (filter) {
        objectIds = filter.split(',').map((id) => new Types.ObjectId(id));
        matchQuery = {
            categoryId: {
                $in: objectIds,
            },
        };
    }

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([
        getProductTotalCount(matchQuery),
        ProductModel.aggregate([
            { $match: matchQuery },
            {
                $sort: {
                    categoryId: 1,
                    name: 1,
                },
            },
            // {
            //     $limit: perPage,
            // },
            // {
            //     $skip: perPage * currentPage,
            // },
        ]),
    ]).then((values) => {
        data = {
            data: values[1],
            page: currentPage,
            perPage: perPage,
            total: values[0],
        };
    });
    return data;
};

const getProductById = async (productId: string): Promise<ProductInterface> => {
    return ProductModel.findById(productId);
};

const updateProductById = async (
    image: Express.Multer.File,
    productId: string,
    updateProduct: ProductInterface,
    user: UserInterface | any
): Promise<ProductInterface> => {
    if (image?.filename) {
        fileRemove(updateProduct?.path, false, updateProduct.image);
    }
    return await ProductModel.findByIdAndUpdate(
        productId,
        {
            ...updateProduct,
            image: image?.filename,
            path: image?.destination.replace(/\.\/public/, ''),
            updatedBy: user.username,
            updatedDate: new Date(),
        },
        { new: true }
    );
};

/**
 * delete product by id
 * @param {string} productId
 * @returns {Promise<TableInterface>}
 */
const deleteProductById = async (productId: string): Promise<ProductInterface> => {
    const deletedProduct = await ProductModel.findOneAndDelete({ _id: productId });
    fileRemove(deletedProduct.path, false, deletedProduct?.image);
    return deletedProduct;
};

export const productService = {
    createNewProduct,
    getAllProduct,
    deleteProductById,
    getAllProductWithPagination,
    getProductById,
    updateProductById,
};
