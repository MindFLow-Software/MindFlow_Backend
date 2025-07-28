import { randomUUID } from 'node:crypto'

import { Entity } from '@/core/entities/entity'
import { Optional } from '@/_types/optional'

import { Appointment } from './appointment'
import { MedicalRecordList } from './medical-records-list'
import { Payment } from './payment'

export enum PsychologistRole {
  PSYCHOLOGIST = 'PSYCHOLOGIST',
}

export enum Gender {
  OTHER = 'OTHER',
  FEMININE = 'FEMININE',
  MASCULINE = 'MASCULINE',
}

export enum Expertise {
  OTHER = 'OTHER',
  SOCIAL = 'SOCIAL',
  INFANT = 'INFANT',
  CLINICAL = 'CLINICAL',
  JURIDICAL = 'JURIDICAL',
  EDUCATIONAL = 'EDUCATIONAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  PSYCHOTHERAPIST = 'PSYCHOTHERAPIST',
  NEUROPSYCHOLOGY = 'NEUROPSYCHOLOGY',
}

export type Ipsychologist = {
  id: string
  firstName: string
  lastName: string
  email: string | null | undefined
  password: string | null | undefined
  phoneNumber: string
  isActive: boolean
  profileImageUrl: string | null | undefined
  crp: string | null | undefined
  dateOfBrith: Date
  cpf: string
  createdAt: Date
  updatedAt: Date
  role: PsychologistRole
  gender: Gender
  expertise: Expertise
  paymentId: string | null
  appointments: Appointment[]
  medicalRecords: MedicalRecordList
}

export class Psychologist extends Entity<Ipsychologist> {
  get id() {
    return this.props.id
  }

  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  get isActive() {
    return this.props.isActive
  }

  get profileImageUrl() {
    return this.props.profileImageUrl
  }

  get crp() {
    return this.props.crp
  }

  get dateOfBrith() {
    return this.props.dateOfBrith
  }

  get cpf() {
    return this.props.cpf
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get role() {
    return this.props.role
  }

  get gender() {
    return this.props.gender
  }

  get expertise() {
    return this.props.expertise
  }

  set paymentId(newPaymentId: string | null) {
    this.props.paymentId = newPaymentId
  }

  get paymentId() {
    return this.props.paymentId
  }

  set appointments(newAppointments: Appointment[]) {
    this.props.appointments = newAppointments
  }

  get appointments() {
    return this.props.appointments
  }

  set medicalRecords(newRecords: MedicalRecordList) {
    this.props.medicalRecords = newRecords
  }

  get medicalRecords() {
    return this.props.medicalRecords
  }

  static create(
    props: Optional<
      Ipsychologist,
      'id' | 'isActive' | 'paymentId' | 'appointments' | 'medicalRecords' | 'createdAt' | 'updatedAt'
    >,
  ) {
    const psychologist = new Psychologist({
      ...props,
      id: props.id || randomUUID(),
      isActive: props.isActive || false,
      paymentId: props.paymentId || null,
      appointments: props.appointments || [],
      medicalRecords: props.medicalRecords || new MedicalRecordList(),
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })

    return psychologist
  }
}
