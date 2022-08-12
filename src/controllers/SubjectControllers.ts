import { Request, Response } from "express";
import { subjectRespository } from "../respositories/SubjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Campo nome é obrigatorio" });
    }
    try {
      const newSubject = subjectRespository.create({
        name,
      });
      await subjectRespository.save(newSubject);

      return res.status(201).json(newSubject);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
