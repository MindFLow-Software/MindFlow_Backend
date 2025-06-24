import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'
import { randomUUID } from 'node:crypto'

export enum PatientRole {
  PATIENT = 'PATIENT',
}

export enum Gender {
  OTHER = 'OTHER',
  FEMININE = 'FEMININE',
  MASCULINE = 'MASCULINE',
}

export type Ipatient = {
  id: string
  firstName: string
  lastName: string
  email?: string
  password?: string
  phoneNumber: string
  profileImageUrl?: string
  dateOfBrith: Date
  cpf: string
  createdAt: Date
  updatedAt: Date
  role: PatientRole
  gender: Gender
}

export class Patient extends Entity<Ipatient> {
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

  get profileImageUrl() {
    return this.props.profileImageUrl
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

  static create(props: Optional<Ipatient, 'id' | 'createdAt' | 'updatedAt'>) {
    const patient = new Patient({
      ...props,
      id: props.id || randomUUID(),
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })

    return patient
  }
}
