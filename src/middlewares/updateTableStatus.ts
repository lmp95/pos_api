import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';

const callback = (req, resolve, reject) => async (err, user: UserInterface, info: Error) => {
    resolve();
};

export const updateTableStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, callback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};
