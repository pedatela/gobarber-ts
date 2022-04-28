import { injectable, inject } from 'tsyringe';

// Hash Provider
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// Error
import AppError from "@shared/errors/AppError";

// Model
import User from "@modules/users/infra/typeorm/entities/User";

// Repositories Interface
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface Request{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider 
    ){}

    public async execute({name, email, password}: Request): Promise<User>{
        
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError('Email address already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name, 
            email, 
            password: hashedPassword
        });

        return user;

    }
}

export default CreateUserService;