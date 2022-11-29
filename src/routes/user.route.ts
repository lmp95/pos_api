import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/validate';

const userRouter = Router();

userRouter.route('/').get(authMiddleware, UserController.getUsers);
userRouter.route('/').post(UserController.createUser);

export default userRouter;
