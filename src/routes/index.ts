import { Router } from 'express';
import authRouter from './auth.route';
import categoryRouter from './category.route';
import memberRouter from './member.route';
import orderRouter from './order.route';
import tableRouter from './table.route';
import userRouter from './user.route';
import productRouter from './product.route';

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
        path: '/product',
        route: productRouter,
    },
    {
        path: '/order',
        route: orderRouter,
    },
    {
        path: '/table',
        route: tableRouter,
    },
    {
        path: '/member',
        route: memberRouter,
    },
];

defaultRoutes.forEach((route) => {
    appRouter.use(route.path, route.route);
});

export default appRouter;
