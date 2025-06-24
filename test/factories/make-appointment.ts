import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

import {
  Appointment,
  AppointmentStatus,
  Iappointment,
} from '@/core/domain/enterprise/entities/appointment'

export const makeAppointment = async (override: Partial<Iappointment> = {}) => {
  const appointment = Appointment.create({
    id: randomUUID(),
    diagnosis: faker.lorem.text(),
    patientId: randomUUID(),
    psychologistId: randomUUID(),
    scheduledAt: new Date(),
    status: AppointmentStatus.ATTENDING,
    ...override,
  })

  return appointment
}
