
import { Router } from "express";
import multer from 'multer';
import uploadConfig from "../../../../../config/upload";

// Middleware
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

// Controllers
import UsersController from "../controllers/UsersController";

const usersRouter = Router();

const usersConntroller = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersConntroller.create);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersConntroller.updateAvatar);


export default usersRouter;