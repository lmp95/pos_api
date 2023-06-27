import { NextFunction, Request, Response } from 'express';
import { tableService } from '../services/table.service';
import { requestHandler } from '../utils/utility';

const addTable = async (req: Request, res: Response, next: NextFunction) => {
    const newTable = await requestHandler(tableService.addTable(req.body, req.user), res, next);
    res.send(newTable);
};

const getTableList = async (req: Request, res: Response, next: NextFunction) => {
    const tables = await requestHandler(tableService.retrieveTables(), res, next);
    res.send(tables);
};

const updateTable = async (req: Request, res: Response, next: NextFunction) => {
    const table = await requestHandler(tableService.updateTable(req.params.tableId, req.body, req.user), res, next);
    res.send(table);
};

const deleteTable = async (req: Request, res: Response, next: NextFunction) => {
    const deletedTable = await requestHandler(tableService.deleteTable(req.params.tableId), res, next);
    res.send(deletedTable);
};

export const tableController = {
    addTable,
    getTableList,
    updateTable,
    deleteTable,
};
