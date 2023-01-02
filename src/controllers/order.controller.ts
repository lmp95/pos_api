import { NextFunction, Request, Response } from 'express';
import { orderService } from '../services/order.service';

const createNewOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder = await orderService.createNewOrder(req.body, req.user);
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
};

const retrieveAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder = await orderService.retrieveAllOrder();
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
};

const retrieveOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder = await orderService.retrieveOrderDetailById(req.params.orderId);
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
};

export const orderController = {
    createNewOrder,
    retrieveAllOrder,
    retrieveOrderDetailById,
};
