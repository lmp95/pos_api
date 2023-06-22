import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { requestHandler } from '../utils/utility';

const login = async (req: Request, res: Response, next: NextFunction) => {
    const result = await requestHandler(AuthService.Login(req.body), next);
    res.send(result);
};

export const AuthController = {
    login,
};
