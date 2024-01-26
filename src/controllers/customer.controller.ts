import { NextFunction, Request, Response } from "express";
import { customerService } from "../services/customer.service";
import { requestHandler } from "../utils/utility";

const addNewCustomer = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(customerService.addNewCustomer(req.body, req.user), res, next);
};

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(customerService.updateCustomer(req.params.customerId, req.body, req.user), res, next);
};

const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(customerService.deleteCustomer(req.params.customerId), res, next);
};

const retrieveAllCustomer = (req: Request, res: Response, next: NextFunction) => {
  const filter = req.query.filter?.toString();
  const search = req.query.search?.toString();
  requestHandler(
    customerService.getAllCustomers(
      search as string,
      filter as string,
      req.query.limit as string,
      req.query.page as string
    ),
    res,
    next
  );
};

const getCustomerById = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(customerService.getCustomerById(req.params.customerId), res, next);
};

export const customerController = {
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  retrieveAllCustomer,
  getCustomerById,
};
