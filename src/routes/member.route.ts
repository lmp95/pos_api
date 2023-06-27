import { Router } from 'express';
import { authMiddleware } from '../middlewares/validate';
import { customerController } from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.route('/').all(authMiddleware).get(customerController.retrieveAllCustomer).post(customerController.addNewCustomer);
customerRouter.route('/:memberId').all(authMiddleware).post(customerController.updateCustomer).delete(customerController.deleteCustomer);

export default customerRouter;
