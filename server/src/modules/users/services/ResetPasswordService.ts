import "reflect-metadata"
import { differenceInHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

// Error
import AppError from "@shared/errors/AppError";

// Repositories Interface
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface IRequest{
    token:string;
    password: string;
}

@injectable()
class ResetPasswordService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({token, password}: IRequest): Promise<void>{
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User token does not exists')
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        
        if(!user){
            throw new AppError('User does not exists')
        }

        const tokenCreatedAt = userToken.created_at;

        if(differenceInHours( Date.now(), tokenCreatedAt) > 2 ){
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;