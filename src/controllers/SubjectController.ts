import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { subjectRespository } from "../respositories/SubjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      throw new BadRequestError("Campo nome é obrigatorio");
    }
    const newSubject = subjectRespository.create({
      name,
    });
    await subjectRespository.save(newSubject);

    return res.status(201).json(newSubject);
  }
}
