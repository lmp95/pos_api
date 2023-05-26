import httpStatus from 'http-status';
import { CategoryInterface } from '../interfaces/category.interface';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { UserInterface } from '../interfaces/user.interface';
import CategoryModel from '../models/category.model';
import ApiError from '../utils/apiError';
import { validateObjectId } from '../utils/utils';
import { Types } from 'mongoose';

/**
 * Create new category
 * @param {CategoryInterface} newCategory
 * @param {UserInterface} user
 * @returns {Promise<CategoryInterface>}
 */
const createCategory = async (newCategory: CategoryInterface, user: UserInterface | any): Promise<CategoryInterface> => {
    const parentID = newCategory?.parentId && new Types.ObjectId(newCategory?.parentId as string);

    return await CategoryModel.create({
        ...newCategory,
        parentId: parentID || null,
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
    });
};

/**
 * get category list
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<DataTableInterface>}
 */
const getCategoryList = async (limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([
        getCategoryTotalCount(),
        CategoryModel.find({ parentId: null })
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
 * get category by id
 * @returns {Promise<CategoryInterface>}
 */
const getCategoryById = async (categoryId: string): Promise<number> => {
    return await CategoryModel.findById(categoryId);
};

/**
 * get category total count
 * @returns {Promise<number>}
 */
const getCategoryTotalCount = async (): Promise<number> => {
    return await CategoryModel.find().count();
};

/**
 * update category by Id
 * @param {string} categoryId
 * @param {CategoryInterface} updateCategory
 * @param {UserInterface} user
 * @returns {Promise<CategoryInterface>}
 */
const updateCategoryById = async (categoryId: string, updateCategory: CategoryInterface, user: UserInterface | any): Promise<CategoryInterface> => {
    return checkCategoryExist(categoryId).then(async (result) => {
        return await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
                ...updateCategory,
                updatedBy: user.username,
                updatedDate: new Date(),
            },
            { new: true }
        );
    });
};

/**
 * check category exist by Id
 * @param {string} categoryId
 * @returns {Promise<CategoryInterface>}
 */
const checkCategoryExist = async (categoryId: string): Promise<CategoryInterface> => {
    if (validateObjectId(categoryId)) {
        return await CategoryModel.findById(categoryId);
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
};

/**
 * retrieve all category without limitation
 * @returns {Promise<CategoryInterface[]>}
 */
const getAllCategory = async (): Promise<CategoryInterface[]> => {
    return await CategoryModel.find();
};

/**
 *  delete category by Id
 * @param {string} categoryId
 * @returns {Promise<CategoryInterface>}
 */
const deleteCategoryById = async (categoryId: string): Promise<CategoryInterface> => {
    return await CategoryModel.findByIdAndDelete(categoryId);
};

/**
 *  get list of sub category by parent Id
 * @param {string} parentCatId
 * @returns {Promise<CategoryInterface[]>}
 */
const getSubCategoryById = async (parentCatId: string): Promise<CategoryInterface[]> => {
    return await CategoryModel.find({ parentId: parentCatId });
};

export const categoryService = {
    createCategory,
    getCategoryList,
    updateCategoryById,
    checkCategoryExist,
    getAllCategory,
    getCategoryById,
    deleteCategoryById,
    getSubCategoryById,
};
