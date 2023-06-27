import { NextFunction, Request, Response } from 'express';
import { customerService } from '../services/customer.service';
import { requestHandler } from '../utils/utility';

const addNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(customerService.addNewCustomer(req.body, req.user), next);
    res.send(member);
};

const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(customerService.updateCustomer(req.params.memberId, req.body, req.user), next);
    res.send(member);
};

const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(customerService.deleteCustomer(req.params.memberId), next);
    res.send(member);
};

const retrieveAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const members = await requestHandler(customerService.getAllCustomers(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(members);
};

export const customerController = {
    addNewCustomer,
    updateCustomer,
    deleteCustomer,
    retrieveAllCustomer,
};
