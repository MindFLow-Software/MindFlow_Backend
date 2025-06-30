import { makePatient } from 'test/factories/make-patient'
import { GetPatientByEmailUseCase } from './get-patient-by-email'
import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: GetPatientByEmailUseCase

describe('[GET]:PATIENT:EMAIL', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new GetPatientByEmailUseCase(inMemoryPatientRepository)
  })

  it('should be able to get a patient by email', async () => {
    const patientEmail = 'paulinho@test.com'

    inMemoryPatientRepository.create(
      await makePatient({
        firstName: 'paulinho',
        email: patientEmail,
      }),
    )

    const { patient } = await sut.execute({ email: patientEmail })

    expect(patient).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        email: patientEmail,
      }),
    )
  })
})
