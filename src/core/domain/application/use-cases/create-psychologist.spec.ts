import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

import {
  Expertise,
  PsychologistRole,
} from '../../enterprise/entities/psychologist'
import { Gender } from '@/_types/enum-gender'

import { CreatePsychologistUseCase } from './create-psychologist'
import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: CreatePsychologistUseCase

describe('[POST]:PSYCHOLOGIST', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new CreatePsychologistUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to create a psychologist', async () => {
    await sut.execute({
      firstName: 'paulinho',
      lastName: faker.person.lastName(),
      gender: Gender.MASCULINE,
      profileImageUrl: faker.image.url(),
      cpf: '45719845976',
      dateOfBrith: new Date(),
      email: faker.internet.email(),
      password: await hash('123456', 8),
      crp: '06/123456',
      expertise: Expertise.PSYCHOTHERAPIST,
      phoneNumber: '11978457622',
      role: PsychologistRole.PSYCHOLOGIST,
    })

    expect(inMemoryPsychologistRepository.psychologists[0]).toEqual(
      await expect.objectContaining({
        id: expect.any(String),
        firstName: 'paulinho',
        role: 'PSYCHOLOGIST',
        expertise: 'PSYCHOTHERAPIST',
      }),
    )
  })
})
