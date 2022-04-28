import { uuid } from "uuidv4";
import {isEqual} from 'date-fns'

// Model
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

// Repositories Interface
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

// DTO
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";


class FakeAppointmentRepository implements IAppointmentsRepository{
    private appointments: Appointment[] = []
    
    public async findByDate(date: Date): Promise<Appointment | undefined>{
        return this.appointments.find(appointment => isEqual(appointment.date, date))
    }
    
    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id } )
        this.appointments.push(appointment);
        return appointment;
    }
}

export default FakeAppointmentRepository;