import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

// Error
import AppError from "@shared/errors/AppError";

// Model
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

// Repositories Interface
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

interface Request{
    provider_id: string;
    date: Date;
}


@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository 
    ){}   

    public async execute({provider_id, date}: Request): Promise<Appointment>{

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    
        if(findAppointmentInSameDate){
            throw new AppError('This appointment has already booked')
        }

        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate})

        return appointment;
    }
}

export default CreateAppointmentService;