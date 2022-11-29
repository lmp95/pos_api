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
const getItemTotalCount = async (): Promise<number> => {
    return await ItemModel.find().count();
};

/**
 * Get all items
 * @returns {Promise<DataTableInterface[]>}
 */
const getAllItems = async (limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([
        getItemTotalCount(),
        ItemModel.find()
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
 * Filter the items by category
 * @param {categoryId} categoryId
 * @returns {Promise<ItemInterface[]>}
 */
const filterItemsByCategory = async (category: string | string[]): Promise<ItemInterface[]> => {
    const itemList = await ItemModel.find({ categoryId: { $in: category } });
    return itemList;
};

export const itemService = {
    createNewItem,
    getAllItems,
    filterItemsByCategory,
};
