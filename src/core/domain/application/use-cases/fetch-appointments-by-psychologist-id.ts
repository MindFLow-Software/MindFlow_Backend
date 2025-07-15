import { Injectable } from '@nestjs/common'
import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

type IfetchAppointmentsByPsychologistIdRequest = {
  pageIndex: number
  perPage: number
  orderBy?: 'asc' | 'desc'
  psychologistId: string
}

type IfetchAppointmentsByPsychologistIdResponse = {
  appointments: Appointment[]
}

@Injectable()
export class FetchAppointmentsByPsychologistIdUseCase {
  constructor(
    private appointmentsRepository: AppointmentRepository
  ) {}

  async execute({
    pageIndex,
    perPage,
    orderBy = 'asc',
    psychologistId,
  }: IfetchAppointmentsByPsychologistIdRequest): Promise<IfetchAppointmentsByPsychologistIdResponse> {
    const appointments = await this.appointmentsRepository.findManyByPsychologist({
      pageIndex,
      perPage,
      orderBy,
      psychologistId,
    })

    return {
      appointments
    }
  }
}