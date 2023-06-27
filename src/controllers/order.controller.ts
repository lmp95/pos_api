import { NextFunction, Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { requestHandler } from '../utils/utility';

const createNewOrder = async (req: Request, res: Response, next: NextFunction) => {
    const newOrder = await requestHandler(orderService.createNewOrder(req.body, req.user), res, next);
    res.send(newOrder);
};

const retrieveAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    const newOrder = await requestHandler(
        orderService.retrieveAllOrder(req.query.filter as string, req.query.limit as string, req.query.page as string),
        res,
        next
    );
    res.send(newOrder);
};

const retrieveOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
    const newOrder = await requestHandler(orderService.retrieveOrderDetailById(req.params.orderId), res, next);
    res.send(newOrder);
};

export const orderController = {
    createNewOrder,
    retrieveAllOrder,
    retrieveOrderDetailById,
};
