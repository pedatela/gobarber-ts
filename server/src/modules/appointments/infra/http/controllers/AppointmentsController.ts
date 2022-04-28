import "reflect-metadata";
import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import { container } from "tsyringe";

// Services
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";


class AppoitmentConntroller{
    public async create(request: Request, response: Response): Promise<Response>{
        const {provider_id, date} = request.body;

        const createAppointment = container.resolve(CreateAppointmentService)
        
        const parsedDate = parseISO(date)
        const appointment = await createAppointment.execute({provider_id, date: parsedDate})

        return response.json(appointment);
    }
}

export default AppoitmentConntroller;