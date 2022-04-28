import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";

// Services
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import CreateUserService from "@modules/users/services/CreateUserService";

class UserConntroller{
    public async create(request: Request, response: Response): Promise<Response>{
        const {name, email, password}  = request.body;

        const createUser = container.resolve(CreateUserService)
        const user = await createUser.execute({name, email, password})
        // @ts-expect-error
        delete user.password;


        return response.json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response>{
        const updateUserAvatar =  container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            // @ts-expect-error
            avatarFilename: request.file.filename
        })

        // @ts-expect-error
        delete user.password;
        return response.json(user)
    }
}

export default UserConntroller;