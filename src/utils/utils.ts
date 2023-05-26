import { genSalt, hash, compare } from 'bcryptjs';
import { NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const validatePassword = async (enteredPassword: string, password: string): Promise<boolean> => {
    return await compare(enteredPassword, password);
};

export const validateObjectId = (id: string) => {
    return isValidObjectId(id);
};

export const requestHandler = async (fn: Promise<any>, next: NextFunction) => {
    try {
        return await fn;
    } catch (error) {
        next(error);
    }
};
