import { AppointmentRepository } from '@/core/domain/application/repositories/appointment-repository'
import { Appointment } from '@/core/domain/enterprise/entities/appointment'

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
}
