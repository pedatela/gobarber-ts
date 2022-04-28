import { Router } from "express";

// Middlewares
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

// Controller
import AppoitmentsConntroller from "../controllers/AppointmentsController";


const appointmentsRouter = Router();
const appoitmentsConntroller = new AppoitmentsConntroller();

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response)=>{

//     const appointments = await appointmentsRepository.find()
//     return response.json(appointments);
// });

appointmentsRouter.post('/', appoitmentsConntroller.create);



export default appointmentsRouter;