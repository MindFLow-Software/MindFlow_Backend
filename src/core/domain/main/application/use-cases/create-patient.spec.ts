import { PatientRole } from '../../enterprise/entities/patient'
import { CreatePatientUseCase } from './create-patient'
import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'

import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { Gender } from '@/_types/enum-gender'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: CreatePatientUseCase

describe('[POST]:PATIENT', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new CreatePatientUseCase(inMemoryPatientRepository)
  })
  it('should be able to create a patient', async () => {
    sut.execute({
      firstName: 'paulinho',
      lastName: faker.person.lastName(),
      gender: Gender.MASCULINE,
      profileImageUrl: faker.image.url(),
      cpf: '45719845976',
      dateOfBrith: new Date(),
      email: faker.internet.email(),
      password: await hash('123456', 8),
      phoneNumber: '11978457622',
      role: PatientRole.PATIENT,
    })

    expect(inMemoryPatientRepository.patients[0]).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        cpf: '45719845976',
        role: 'PATIENT',
      }),
    )
  })
})
