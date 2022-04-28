// Model
import User from "@modules/users/infra/typeorm/entities/User";

// Repositories Interface
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

// DTO
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";


import { getRepository, Repository } from "typeorm";


class UserRepository implements IUsersRepository{
    private ormRepository: Repository<User>;
    constructor(){
        this.ormRepository = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined>{
        const findAppointment = await this.ormRepository.findOne(id)
        return findAppointment || undefined;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const findAppointment = await this.ormRepository.findOne({
            where: {email}
        })
        return findAppointment || undefined;
    }

    public async create({name,email,password}: ICreateUserDTO): Promise<User>{
        const user = this.ormRepository.create({name, email, password});
        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: User): Promise<User>{
        return await this.ormRepository.save(user);
    }
}

export default UserRepository;