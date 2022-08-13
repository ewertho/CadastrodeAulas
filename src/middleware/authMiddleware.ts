import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../respositories/UserRepository";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
};

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError("Não autorizado!");
  }
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
  const userExist = await userRepository.findOneBy({ id });
  if (!userExist) {
    throw new UnauthorizedError("Não autorizado!");
  }
  const { password: _, ...loggedUser } = userExist;

  req.user = loggedUser;
  next();
};
