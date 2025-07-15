import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

type IfetchAppointmentRequest = {
  pageIndex: number
  perPage: number
  orderBy?: 'asc' | 'desc'
}

type IfetchAppointmentResponse = {
  appointments: Appointment[]
}

export class FetchAppointmentsUseCase {
  constructor(private AppointmentRepository: AppointmentRepository) {}

  async execute({
    pageIndex,
    perPage,
    orderBy = 'asc',
  }: IfetchAppointmentRequest): Promise<IfetchAppointmentResponse> {
    const appointments = await this.AppointmentRepository.findMany({
      pageIndex,
      perPage,
      orderBy,
    })

    return {
      appointments,
    }
  }
}
