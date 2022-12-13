import httpStatus from 'http-status';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { ItemInterface } from '../interfaces/item.interface';
import { UserInterface } from '../interfaces/user.interface';
import ItemModel from '../models/item.model';
import ApiError from '../utils/apiError';
import { categoryService } from './category.service';

/**
 * Create new item
 * @param {newItem} newItem
 * @param {user} user
 * @returns {Promise<ItemInterface>}
 */
const createNewItem = async (newItem: ItemInterface, user: UserInterface | any): Promise<ItemInterface> => {
    const category = await categoryService.checkCategoryExist(newItem.categoryId.toString());
    if (category)
        return await ItemModel.create({
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
const getItemTotalCount = async (category?: string): Promise<number> => {
    let filter = {};
    if (category?.length > 0) filter = { categoryId: { $in: category } };
    return await ItemModel.find(filter).count();
};

/**
 * Get all items
 * @param {limit} limit
 * @param {page} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllItems = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
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
        getItemTotalCount(filter),
        ItemModel.find(filterCategory)
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

export const itemService = {
    createNewItem,
    getAllItems,
};
