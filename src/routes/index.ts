import { Router } from 'express';
import authRouter from './auth.route';
import categoryRouter from './category.route';
import itemRouter from './item.route';
import userRouter from './user.route';

const appRouter = Router();

const defaultRoutes = [
    {
        path: '',
        route: authRouter,
    },
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/category',
        route: categoryRouter,
    },
    {
        path: '/Item',
        route: itemRouter,
    }
];

defaultRoutes.forEach((route) => {
    appRouter.use(route.path, route.route);
});

export default appRouter;
