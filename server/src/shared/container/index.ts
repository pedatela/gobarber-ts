import { container } from "tsyringe";

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

// import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
// import UserToken from "@modules/users/infra/typeorm/repositories/UserToken";


container.registerSingleton<IAppointmentsRepository>('AppointmentRepository', AppointmentRepository);
container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
// container.registerSingleton<IUserTokenRepository>('UserRepository', UserRepository)