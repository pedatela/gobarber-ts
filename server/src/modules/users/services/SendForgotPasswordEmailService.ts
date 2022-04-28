import "reflect-metadata"
import { injectable, inject } from 'tsyringe';

// Error
import AppError from "@shared/errors/AppError";

// Model
import User from "@modules/users/infra/typeorm/entities/User";

// Repositories Interface
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IMailProvider from "@shared/container/providers/MailProvider/model/IMailProvider";

interface IRequest{
    email: string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository
    ){}

    public async execute({email}: IRequest): Promise<void>{
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new AppError('User does not exists!!')
        }

        await this.userTokensRepository.generate(user.id)
        await this.mailProvider.sendMail(email, 'Pedido de Recuperação de Senha Recebido')
    }
}

export default SendForgotPasswordEmailService;