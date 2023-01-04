import { DataTableInterface } from '../interfaces/dataTable.interface';
import { TableInterface } from '../interfaces/table.interface';
import { UserInterface } from '../interfaces/user.interface';
import TableModel from '../models/table.model';

/**
 * add new table
 * @param {newTable} newTable
 * @param {user} user
 * @returns {Promise<TableInterface>}
 */
const addTable = async (newTable: TableInterface, user: UserInterface | any): Promise<TableInterface> => {
    const createdTable = await TableModel.create({
        ...newTable,
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
    });
    return createdTable;
};

/**
 * update table
 * @param {newTable} newTable
 * @param {user} user
 * @returns {Promise<TableInterface>}
 */
const updateTable = async (tableId: string, table: TableInterface, user: UserInterface | any): Promise<TableInterface> => {
    const updatedTable = await TableModel.findOneAndUpdate(
        { _id: tableId },
        {
            ...table,
            updatedBy: user.username,
            updatedDate: new Date(),
        },
        { new: true }
    );
    return updatedTable;
};

/**
 * delete table by name
 * @param {newTable} newTable
 * @param {user} user
 * @returns {Promise<TableInterface>}
 */
const deleteTable = async (tableId: string): Promise<TableInterface> => {
    return await TableModel.findOneAndDelete({ _id: tableId });
};

/**
 * retrieve table list
 * @returns {Promise<TableInterface[]>}
 */
const retrieveTables = async (): Promise<TableInterface[]> => {
    return await TableModel.find();
};

export const tableService = {
    retrieveTables,
    addTable,
    updateTable,
    deleteTable,
};
