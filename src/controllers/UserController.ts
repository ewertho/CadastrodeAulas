import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../respositories/UserRepository";
import bcrypt from "bcrypt";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userExist = await userRepository.findOneBy({ email });
    if (userExist) {
      throw new BadRequestError("Usuario ja cadastrado");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepository.save(newUser);
    const { password: _, ...user } = newUser;
    return res.status(201).json(user);
  }
}
