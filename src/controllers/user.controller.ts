import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { requestHandler } from "../utils/utility";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(UserServices.createUser(req.body), res, next);
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(UserServices.getUsers(), res, next);
};

export const UserController = {
  createUser,
  getUsers,
};
