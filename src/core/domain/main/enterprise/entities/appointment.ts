import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'
import { randomUUID } from 'crypto'

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  ATTENDING = 'ATTENDING',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  NOT_ATTEND = 'NOT_ATTEND',
  RESCHEDULED = 'RESCHEDULED',
}

export type Iappointment = {
  id: string
  patientId: string
  psychologistId: string
  diagnosis: string
  notes?: string
  scheduledAt: Date
  startedAt?: Date
  endedAt?: Date
  durationInMin?: number
  status: AppointmentStatus
  createdAt: Date
  updatedAt: Date
}

export class Appointment extends Entity<Iappointment> {
  get id() {
    return this.props.id
  }

  get patientId() {
    return this.props.patientId
  }

  get psychologistId() {
    return this.props.psychologistId
  }

  get diagnosis() {
    return this.props.diagnosis
  }

  get notes() {
    return this.props.notes
  }

  get scheduledAt() {
    return this.props.scheduledAt
  }

  get startedAt() {
    return this.props.startedAt
  }

  get endedAt() {
    return this.props.endedAt
  }

  get durationInMin() {
    return this.props.durationInMin
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<Iappointment, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const appointment = new Appointment({
      ...props,
      id: props.id || randomUUID(),
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })
  
    return appointment
  }
}
