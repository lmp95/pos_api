import { Router } from 'express';
import { tableController } from '../controllers/table.controller';
import { authMiddleware } from '../middlewares/validate';

const tableRouter = Router();

tableRouter.route('/').get(authMiddleware, tableController.getTableList).post(authMiddleware, tableController.addTable);
tableRouter.route('/:tableId').post(authMiddleware, tableController.updateTable).delete(authMiddleware, tableController.deleteTable);

export default tableRouter;
