import { NextFunction, Request, Response } from "express";
import { tableService } from "../services/table.service";
import { requestHandler } from "../utils/utility";

const addTable = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(tableService.addTable(req.body, req.user), res, next);
};

const getTableList = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(tableService.retrieveTables(), res, next);
};

const updateTable = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(tableService.updateTable(req.params.tableId, req.body, req.user), res, next);
};

const deleteTable = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(tableService.deleteTable(req.params.tableId), res, next);
};

export const tableController = {
  addTable,
  getTableList,
  updateTable,
  deleteTable,
};
