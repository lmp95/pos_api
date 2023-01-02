import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/validate';

const orderRouter = Router();

orderRouter.route('/').get(authMiddleware, orderController.retrieveAllOrder).post(authMiddleware, orderController.createNewOrder);
orderRouter.route('/:orderId').get(authMiddleware, orderController.retrieveOrderDetailById);

export default orderRouter;
