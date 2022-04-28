import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserRepository from "../repositories/fakes/FakeUsersRepository";

import AppError from '@shared/errors/AppError';

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {
    beforeEach(() =>{
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);
    });

    it('should be able to recover the password via email', async ()=>{
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });


        await sendForgotPasswordEmailService.execute({
           email: 'johndoe@gmail.com'
        })
        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user', async () =>{
 
        await expect(sendForgotPasswordEmailService.execute({
            email: 'johndoe@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forgot password token', async () =>{
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });


        await sendForgotPasswordEmailService.execute({
           email: 'johndoe@gmail.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id);

    });
});