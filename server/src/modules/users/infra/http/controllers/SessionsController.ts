import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";


// Services
import CreateSessionService from "@modules/users/services/CreateSessionService";

class SessionsConntroller{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email, password}  = request.body;
        const createSession = container.resolve(CreateSessionService)

        const { user, token } = await createSession.execute({email, password});

        // @ts-expect-error
        delete user.password;

        return response.json({ user, token });
    }

}

export default SessionsConntroller;