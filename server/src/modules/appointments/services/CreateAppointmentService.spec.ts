import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from '@shared/errors/AppError'


describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async ()=>{
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment = await createAppointmentService.execute({
            provider_id: '123',
            date: new Date()
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123');
    })  

    it('should not be able to create two appointment at same time', async ()=>{
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointmentService.execute({
            provider_id: '123',
            date: appointmentDate
        })

        expect(createAppointmentService.execute({
            provider_id: '123',
            date: appointmentDate
        })).rejects.toBeInstanceOf(AppError);
       
    })
});