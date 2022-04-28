import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "../repositories/fakes/FakeUsersRepository";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import AppError from '@shared/errors/AppError'


describe('SessionUser', () => {
    it('should be able to authenticate', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const createSessionService = new CreateSessionService(fakeUserRepository, fakeHashProvider);

        const user =  await createUserService.execute({name: 'John Doe', email: 'johndoe@gmail.com', password: '123456'})


        const response = await createSessionService.execute({
           email: 'johndoe@gmail.com',
           password: '123456'
        })
        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })  

    it('should not be able to authenticate with non existing user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createSessionService = new CreateSessionService(fakeUserRepository, fakeHashProvider);

        await expect(createSessionService.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
         })).rejects.toBeInstanceOf(AppError);
       
    })

    it('should not be able to authenticate user with wrong password', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const createSessionService = new CreateSessionService(fakeUserRepository, fakeHashProvider);

        await createUserService.execute({name: 'John Doe', email: 'johndoe@gmail.com', password: '123456'})

        await expect(createSessionService.execute({
            email: 'johndoe@gmail.com',
            password: '12345'
         })).rejects.toBeInstanceOf(AppError);
       
    })   
});