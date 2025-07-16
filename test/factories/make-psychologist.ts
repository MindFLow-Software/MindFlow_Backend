import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import {
  Gender,
  Expertise,
  Ipsychologist,
  Psychologist,
  PsychologistRole,
} from '@/core/domain/main/enterprise/entities/psychologist'

export const makePsychologist = async (
  override: Partial<Ipsychologist> = {},
) => {
  const psychologist = Psychologist.create({
    id: randomUUID(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: Gender.FEMININE,
    cpf: '45719845976',
    dateOfBrith: new Date(),
    email: faker.internet.email(),
    password: await hash('123456', 8),
    crp: '06/123456',
    expertise: Expertise.PSYCHOTHERAPIST,
    phoneNumber: '11978457622',
    role: PsychologistRole.PSYCHOLOGIST,
    ...override,
  })

  return psychologist
}
