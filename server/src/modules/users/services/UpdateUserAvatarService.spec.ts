import FakeStorageProvider from "@shared/container/providers/StorageProviders/fakes/FakeStorageAvatar";
import FakeUserRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import AppError from '@shared/errors/AppError'


describe('UpdateUserAvatar', () => {
    it('should be able to upload an avatar', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);
        
        const user = await fakeUserRepository.create({
            email: 'johndoe@gmail.com',
            name: 'John Doe',
            password: '123456'
         })

        await updateUserAvatarService.execute({
           user_id: user.id,
           avatarFilename: 'avatar.jpg'
         })

        
        expect(user.avatar).toBe('avatar.jpg')
    })

    it('should not be able to create an avatar from non existing user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);
     
        await expect(updateUserAvatarService.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should delete old avatar when updating new one', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        // espionar
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);
        
        const user = await fakeUserRepository.create({
            email: 'johndoe@gmail.com',
            name: 'John Doe',
            password: '123456'
            })

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg'
        })

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg'
        })
        
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
        expect(user.avatar).toBe('avatar2.jpg')
    })
});