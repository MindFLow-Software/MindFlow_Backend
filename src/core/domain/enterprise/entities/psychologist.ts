import { randomUUID } from 'node:crypto'

import { Entity } from '@/core/entities/entity'
import { Optional } from '@/_types/optional'

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
  email?: string
  password?: string
  phoneNumber: string
  isActive: boolean
  profileImageUrl?: string
  crp?: string
  dateOfBrith: Date
  cpf: string
  createdAt: Date
  updatedAt: Date
  role: PsychologistRole
  gender: Gender
  expertise: Expertise
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

  static create(
    props: Optional<
      Ipsychologist,
      'id' | 'isActive' | 'createdAt' | 'updatedAt'
    >,
  ) {
    const psychologist = new Psychologist({
      ...props,
      id: props.id || randomUUID(),
      isActive: props.isActive || false,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })

    return psychologist
  }
}
