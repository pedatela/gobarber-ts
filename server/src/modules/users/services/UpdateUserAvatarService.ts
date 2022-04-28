import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';


// Error
import AppError from "@shared/errors/AppError";

// upload 
import uploadConfig from "../../../config/upload";

// Model
import User from "@modules/users/infra/typeorm/entities/User";

// Repositories Interface
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

// Storage Interfacer
import IStorageProvider from '@shared/container/providers/StorageProviders/model/IStorageProvider'



interface Request {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider  
    ){}

    public async execute({ user_id, avatarFilename } : Request): Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401)
        }

        if(user.avatar){
            // deletar o avatar
            this.storageProvider.deleteFile(user.avatar)
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = avatarFilename;
        await this.usersRepository.save(user);
        
        return user;
    }
}

export default UpdateUserAvatarService;