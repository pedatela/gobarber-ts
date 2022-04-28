import "reflect-metadata";
import { Router } from "express";

// Controllers
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();

const sessionsConntroller = new SessionsController();

sessionsRouter.post('/', sessionsConntroller.create);



export default sessionsRouter;