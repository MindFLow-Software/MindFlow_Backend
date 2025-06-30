import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'
import { GetPatientByIdUseCase } from './get-patient-by-id'
import { makePatient } from 'test/factories/make-patient'
import { randomUUID } from 'node:crypto'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: GetPatientByIdUseCase

describe('[GET]:PATIENT:ID', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new GetPatientByIdUseCase(inMemoryPatientRepository)
  })

  it('should be able to get a patient by id', async () => {
    const patientId = randomUUID()

    inMemoryPatientRepository.create(
      await makePatient({
        id: patientId,
        firstName: 'paulinho',
        email: 'paulinho@test.com',
      }),
    )

    const { patient } = await sut.execute({ id: patientId })

    expect(patient).toEqual(
      expect.objectContaining({
        id: patientId,
        firstName: 'paulinho',
        email: 'paulinho@test.com',
      }),
    )
  })
})
