import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

type IfetchAppointmentRequest = {
  pageIndex: number
  perPage: number
}

type IfetchAppointmentResponse = {
  appointments: Appointment[]
}

export class FetchAppointmentsUseCase {
  constructor(private AppointmentRepository: AppointmentRepository) {}

  async execute({
    pageIndex,
    perPage,
  }: IfetchAppointmentRequest): Promise<IfetchAppointmentResponse> {
    const appointments = await this.AppointmentRepository.findMany({
      pageIndex,
      perPage,
      orderBy: 'asc',
    })

    return {
      appointments,
    }
  }
}
