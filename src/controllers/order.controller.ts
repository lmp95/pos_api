import { NextFunction, Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { requestHandler } from '../utils/utility';

const createNewOrder = (req: Request, res: Response, next: NextFunction) => {
    requestHandler(orderService.createNewOrder(req.body, req.user), res, next);
};

const retrieveAllOrder = (req: Request, res: Response, next: NextFunction) => {
    requestHandler(orderService.retrieveAllOrder(req.query.filter as string, req.query.limit as string, req.query.page as string), res, next);
};

const retrieveOrderDetailById = (req: Request, res: Response, next: NextFunction) => {
    requestHandler(orderService.retrieveOrderDetailById(req.params.orderId), res, next);
};

export const orderController = {
    createNewOrder,
    retrieveAllOrder,
    retrieveOrderDetailById,
};
