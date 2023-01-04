import { Router } from 'express';
import { memberController } from '../controllers/member.controller';
import { authMiddleware } from '../middlewares/validate';

const memberRouter = Router();

memberRouter.route('/').get(authMiddleware, memberController.retrieveAllMember).post(authMiddleware, memberController.addNewMember);
memberRouter.route('/:memberId').post(authMiddleware, memberController.updateMember).delete(authMiddleware, memberController.deleteMember);

export default memberRouter;
