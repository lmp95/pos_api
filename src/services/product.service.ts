import httpStatus from 'http-status';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { ProductInterface } from '../interfaces/product.interface';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';
import { categoryService } from './category.service';
import ProductModel from '../models/product.model';

/**
 * Create new item
 * @param {newItem} newItem
 * @param {user} user
 * @returns {Promise<ProductInterface>}
 */
const createNewProduct = async (newItem: ProductInterface, user: UserInterface | any): Promise<ProductInterface> => {
    const category = await categoryService.checkCategoryExist(newItem.categoryId.toString());
    if (category)
        return await ProductModel.create({
            ...newItem,
            createdBy: user.username,
            createdDate: new Date(),
            updatedBy: user.username,
            updatedDate: new Date(),
        });
    else throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create item');
};

/**
 * get category total count
 * @returns {Promise<number>}
 */
const getProductTotalCount = async (category?: string): Promise<number> => {
    let filter = {};
    if (category?.length > 0) filter = { categoryId: { $in: category } };
    return await ProductModel.find(filter).count();
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
    let filterCategory = {};
    if (filter) filterCategory = { categoryId: { $in: filter } };
    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([
        getProductTotalCount(filter),
        ProductModel.find(filterCategory)
            .limit(perPage)
            .skip(perPage * currentPage),
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

/**
 * delete product by id
 * @param {string} productId
 * @returns {Promise<TableInterface>}
 */
const deleteProductById = async (productId: string): Promise<ProductInterface> => {
    return await ProductModel.findOneAndDelete({ _id: productId });
};

export const productService = {
    createNewProduct,
    getAllProduct,
    deleteProductById,
};
