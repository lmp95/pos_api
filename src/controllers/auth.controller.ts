import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { requestHandler } from "../utils/utility";

const login = (req: Request, res: Response, next: NextFunction) => {
  requestHandler(AuthService.Login(req.body), res, next);
};

export const AuthController = {
  login,
};
