import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user.service';
import { requestHandler } from '../utils/utils';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await requestHandler(UserServices.createUser(req.body), next);
    res.send(user);
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await requestHandler(UserServices.getUsers(), next);
    res.send(users);
};

export const UserController = {
    createUser,
    getUsers,
};
