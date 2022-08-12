import { Router } from "express";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectControllers";

const routes = Router();
const subject = new SubjectController();
const room = new RoomController();

routes.post("/subject", subject.create);
routes.post("/room", room.create);
routes.post("/room/:idRoom/create", room.createVideo);
routes.post("/room/:idRoom/subject", room.roomSubject);
routes.get("/room", room.list);

export default routes;
