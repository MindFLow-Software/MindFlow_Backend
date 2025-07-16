import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import {
  Gender,
  Ipatient,
  Patient,
  PatientRole,
} from '@/core/domain/main/enterprise/entities/patient'

export const makePatient = async (override: Partial<Ipatient> = {}) => {
  const patient = Patient.create({
    id: randomUUID(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: Gender.FEMININE,
    cpf: '45719845976',
    dateOfBrith: new Date(),
    email: faker.internet.email(),
    password: await hash('123456', 8),
    phoneNumber: '11978457622',
    role: PatientRole.PATIENT,
    ...override,
  })

  return patient
}
