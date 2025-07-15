import { Injectable } from '@nestjs/common'
import {
  Appointment,
  AppointmentStatus,
} from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

type IcreateAppointmentRequest = {
  patientId: string
  psychologistId: string
  diagnosis: string
  notes?: string
  scheduledAt: Date
  startedAt?: Date
  endedAt?: Date
  status: AppointmentStatus
}

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(data: IcreateAppointmentRequest) {
    const appointment = Appointment.create({
      patientId: data.patientId,
      psychologistId: data.psychologistId,
      diagnosis: data.diagnosis,
      notes: data.notes,
      scheduledAt: data.scheduledAt,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      status: data.status,
    })

    await this.appointmentRepository.create(appointment)
  }
}
