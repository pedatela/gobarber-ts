import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "../repositories/fakes/FakeUsersRepository";
import ResetPasswordService from "./ResetPasswordService";

import AppError from '@shared/errors/AppError';

let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;


describe('SendForgotPasswordEmail', () => {
    beforeEach(() =>{
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        
        resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider);
    });

    it('should be able to reset the password', async ()=>{
        const user  = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({token, password: '123123'});
        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generateHash).toBeCalledWith('123123')
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () =>{
        await expect(resetPasswordService.execute({
                token: 'non-existing-toke', password: '21321'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () =>{
        const {token} = await fakeUserTokenRepository.generate('non-existig-user');

        await expect(resetPasswordService.execute({
                token, password: '21321'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password after two hours', async () =>{
        const user  = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        const {token} = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3)
        })


        await expect(resetPasswordService.execute({
                token, 
                password: '21321'
        })).rejects.toBeInstanceOf(AppError);
    });
});