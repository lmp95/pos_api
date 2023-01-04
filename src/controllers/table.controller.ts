import { NextFunction, Request, Response } from 'express';
import { tableService } from '../services/table.service';

const addTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTable = await tableService.addTable(req.body, req.user);
        res.send(newTable);
    } catch (error) {
        next(error);
    }
};

const getTableList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tables = await tableService.retrieveTables();
        res.send(tables);
    } catch (error) {
        next(error);
    }
};

const updateTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const table = await tableService.updateTable(req.params.tableId, req.body, req.user);
        res.send(table);
    } catch (error) {
        next(error);
    }
};

const deleteTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedTable = await tableService.deleteTable(req.params.tableId);
        res.send(deletedTable);
    } catch (error) {
        next(error);
    }
};

export const tableController = {
    addTable,
    getTableList,
    updateTable,
    deleteTable,
};
