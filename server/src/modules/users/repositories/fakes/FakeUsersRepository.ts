import { uuid } from "uuidv4";

// Model
import User from "@modules/users/infra/typeorm/entities/User";

// Repositories Interface
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

// DTO
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";



class FakeUsersRepository implements IUsersRepository{
    private users: User[] = []

    public async findById(id: string): Promise<User | undefined>{
        return this.users.find(user => user.id === id)
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        return this.users.find(user => user.email === email)
    }

    public async create({name,email,password}: ICreateUserDTO): Promise<User>{
        const user = new User();

        Object.assign(user, { id: uuid(), name, email, password } )
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User>{
       const findIndex = this.users.findIndex(findUser => findUser.id === user.id)
       this.users[findIndex] = user;
       return user;
    }
}

export default FakeUsersRepository;