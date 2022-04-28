// Model
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

// Repositories Interface
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

// DTO
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";


import { getRepository, Repository } from "typeorm";


class AppointmentRepository implements IAppointmentsRepository{
    private ormRepository: Repository<Appointment>;
    constructor(){
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = await this.ormRepository.findOne({
            where: {date}
        })
        return findAppointment || undefined;
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id, date});
        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentRepository;