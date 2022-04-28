import { sign } from "jsonwebtoken";
import { injectable, inject } from 'tsyringe';

// Hash Provider
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// Error
import AppError from "@shared/errors/AppError";

// Model
import User from "@modules/users/infra/typeorm/entities/User";

// AuthConfig
import authConfig from "../../../config/auth";

// Repositories Interface
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface Request{
    email:string,
    password:string
}

interface Response{
    user: User,
    token: string;
}

@injectable()
class CreateSessionService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider 
    ){}

    public async execute({email, password}: Request): Promise<Response>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect Email/Password combination', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMatched){
            throw new AppError('Incorrect Email/Password combination', 401);
        }

        const {secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {subject: user.id, expiresIn});

        return {
            user,
            token
        };        
    }
}

export default CreateSessionService;