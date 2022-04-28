import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import AppError from '@shared/errors/AppError'


describe('CreateUser', () => {
    it('should be able to create a new user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUserRepository,fakeHashProvider);

        const user = await createUserService.execute({
           email: 'johndoe@gmail.com',
           name: 'John Doe',
           password: '123456'
        })
        expect(user).toHaveProperty('id')
    })  

    it('should not be able to create two user with same email', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUserService.execute({
            email: 'johndoe@gmail.com',
            name: 'John Doe',
            password: '123456'
        })

        await expect(createUserService.execute({
            email: 'johndoe@gmail.com',
            name: 'John Doe',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);
       
    })
});