import User from "@modules/users/infra/typeorm/entities/User";

import ICreateUserDTO from "../dtos/ICreateUserDTO";


export default interface IAppointmentsRepository{
    findById(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User>
    save(data: User): Promise<User>
}