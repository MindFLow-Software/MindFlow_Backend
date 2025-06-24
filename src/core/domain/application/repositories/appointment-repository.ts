import { Appointment } from '../../enterprise/entities/appointment'

type IfindMany = {
  pageIndex: number
  perPage: number
  orderBy: 'asc' | 'desc'
}

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>
  abstract save(appointment: Appointment): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Appointment | null>
  abstract findMany({
    pageIndex,
    perPage,
    orderBy,
  }: IfindMany): Promise<Appointment[]>
}
