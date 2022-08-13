import { Router } from "express";
import { AccessController } from "./controllers/AccessController";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectControllers";
import { UserController } from "./controllers/UserController";
import { AuthMiddleware } from "./middleware/authMiddleware";

const routes = Router();
const subject = new SubjectController();
const room = new RoomController();
const user = new UserController();
const access = new AccessController();

//rotas publicas
routes.post("/user", user.create);
routes.post("/login", access.login);

//rotas protegidas
routes.use(AuthMiddleware);
routes.post("/subject", subject.create);
routes.post("/room", room.create);
routes.post("/room/:idRoom/create", room.createVideo);
routes.post("/room/:idRoom/subject", room.roomSubject);
routes.get("/room", room.list);
routes.get("/profile", access.getProfile);

export default routes;
