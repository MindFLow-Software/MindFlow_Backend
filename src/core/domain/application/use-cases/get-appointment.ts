import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

type IgetAppointmentByIdUseCaseRequest = {
  id: string
}

type IgetAppointmentByIdUseCaseResponse = {
  appointment: Appointment | null
}

export class GetAppointmentByIdUseCase {
  constructor(private appoimentRepository: AppointmentRepository) {}

  async execute({
    id,
  }: IgetAppointmentByIdUseCaseRequest): Promise<IgetAppointmentByIdUseCaseResponse> {
    const appointment = await this.appoimentRepository.findById(id)

    return { appointment }
  }
}
