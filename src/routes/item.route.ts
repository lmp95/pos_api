import { Router } from 'express';
import { itemController } from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/validate';

const itemRouter = Router();

itemRouter.route('/').get(authMiddleware, itemController.getItems).post(authMiddleware, itemController.createNewItem);

export default itemRouter;
