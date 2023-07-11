import httpStatus from 'http-status';
import { CategoryInterface } from '../interfaces/category.interface';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { UserInterface } from '../interfaces/user.interface';
import CategoryModel from '../models/category.model';
import ApiError from '../utils/apiError';
import { convertToTreeStructure, validateObjectId } from '../utils/utility';
import { Types, isValidObjectId } from 'mongoose';
import { searchRegexMatch } from '../queries/common';
import { allCategoryQuery, categoryPaginationQuery, categorySearchMatch } from '../queries/Category.query';

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
const getCategoryList = async (search: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    const match = categorySearchMatch(search);
    await Promise.all([
        getCategoryTotalCount(match),
        CategoryModel.aggregate(categoryPaginationQuery({ match: match, currentPage: currentPage, perPage: perPage })),
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
const getCategoryTotalCount = async (searchQuery?: object): Promise<number> => {
    const result = await CategoryModel.aggregate([
        {
            $match: searchQuery || {},
        },
        {
            $count: 'total',
        },
    ]);
    return result[0]?.total;
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
    const result = await CategoryModel.aggregate(allCategoryQuery());
    return convertToTreeStructure(result);
};

/**
 *  delete category by Id
 * @param {string} categoryId
 * @returns {Promise<CategoryInterface>}
 */
const deleteCategoryById = async (categoryId: string): Promise<CategoryInterface> => {
    if (isValidObjectId(categoryId)) return await CategoryModel.findByIdAndDelete(categoryId);
    else throw new ApiError(400, 'Fail to delete');
};

/**
 *  get list of sub category by parent Id
 * @param {string} parentCatId
 * @returns {Promise<CategoryInterface[]>}
 */
const getSubCategoryById = async (parentCatId: string): Promise<CategoryInterface[]> => {
    return await CategoryModel.aggregate([
        {
            $match: {
                parentId: new Types.ObjectId(parentCatId),
            },
        },
        {
            $graphLookup: {
                from: 'categories',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'children',
            },
        },
    ]).sort({ name: 1 });
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
