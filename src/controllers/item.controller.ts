import { NextFunction, Request, Response } from 'express';
import { itemService } from '../services/item.service';

const createNewItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newItem = await itemService.createNewItem(req.body, req.user);
        res.send(newItem);
    } catch (error) {
        next(error);
    }
};

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query.filter?.toString();
        const items = await itemService.getAllItems(filter as string, req.query.limit as string, req.query.page as string);
        res.send(items);
    } catch (error) {
        next(error);
    }
};

export const itemController = {
    createNewItem,
    getItems,
};
