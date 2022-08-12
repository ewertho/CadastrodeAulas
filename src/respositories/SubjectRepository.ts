import { AppDataSource } from "../data-source";
import { Subject } from "../entities/Subject";

export const subjectRespository = AppDataSource.getRepository(Subject);
