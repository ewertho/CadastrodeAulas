import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../respositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AccessController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExist = await userRepository.findOneBy({ email });
    if (!userExist) {
      throw new BadRequestError("Email ou senha invalidos");
    }

    const verifyPass = await bcrypt.compare(password, userExist.password);
    if (!verifyPass) {
      throw new BadRequestError("Email ou senha invalidos");
    }

    const token = jwt.sign({ id: userExist.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = userExist;
    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getProfile(req: Request, res: Response) {
    // const { authorization } = req.headers;
    // if (!authorization) {
    //   throw new UnauthorizedError("Não autorizado!");
    // }
    // const token = authorization.split(" ")[1];
    // const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
    // const userExist = await userRepository.findOneBy({ id });
    // if (!userExist) {
    //   throw new UnauthorizedError("Não autorizado!");
    // }
    // const { password: _, ...loggedUser } = userExist;
    return res.json(req.user);
  }
}
