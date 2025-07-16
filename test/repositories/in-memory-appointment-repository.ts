import { AppointmentRepository } from '@/core/domain/main/application/repositories/appointment-repository'
import { Appointment } from '@/core/domain/main/enterprise/entities/appointment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointments: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment)
  }

  async save(appointment: Appointment): Promise<void> {
    const appointmentToUpdateIndex = this.appointments.findIndex(
      ({ id }) => id === appointment.id,
    )

    this.appointments[appointmentToUpdateIndex] = appointment
  }

  async delete(id: string): Promise<void> {
    this.appointments = this.appointments.filter(
      (appointment) => appointment.id !== id,
    )
  }

  async findById(id: string): Promise<Appointment | null> {
    return (
      this.appointments.find((appointment) => appointment.id === id) || null
    )
  }

  async findMany({
    pageIndex,
    perPage,
    orderBy,
  }: {
    pageIndex: number
    perPage: number
    orderBy: 'asc' | 'desc'
  }): Promise<Appointment[]> {
    return this.appointments
      .slice(pageIndex * perPage, (pageIndex + 1) * perPage)
      .sort((appointmentA, appointmentB) => {
        if (orderBy === 'desc') {
          return (
            appointmentB.scheduledAt.getTime() -
            appointmentA.scheduledAt.getTime()
          )
        } else {
          return (
            appointmentA.scheduledAt.getTime() -
            appointmentB.scheduledAt.getTime()
          )
        }
      })
  }

  async findManyByPsychologist({
    pageIndex,
    perPage,
    orderBy,
    psychologistId,
  }: {
    pageIndex: number
    perPage: number
    orderBy: 'asc' | 'desc'
    psychologistId: string
  }): Promise<Appointment[]> {
    const appointments = await this.appointments
      .slice(pageIndex * perPage, (pageIndex + 1) * perPage)
      .filter((appointment) => appointment.psychologistId === psychologistId)
      .sort((appointmentA, appointmentB) => {
        if (orderBy === 'desc') {
          return (
            appointmentB.scheduledAt.getTime() -
            appointmentA.scheduledAt.getTime()
          )
        } else {
          return (
            appointmentA.scheduledAt.getTime() -
            appointmentB.scheduledAt.getTime()
          )
        }
      })

    return appointments
  }
}
