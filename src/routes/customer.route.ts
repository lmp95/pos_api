import { Router } from 'express';
import { authMiddleware } from '../middlewares/validate';
import { customerController } from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.route('/').all(authMiddleware).get(customerController.retrieveAllCustomer).post(customerController.addNewCustomer);
customerRouter
    .route('/:customerId')
    .all(authMiddleware)
    .get(customerController.getCustomerById)
    .put(customerController.updateCustomer)
    .post(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

export default customerRouter;
