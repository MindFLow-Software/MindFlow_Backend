import { makePatient } from 'test/factories/make-patient'
import { DeletePatientUseCase } from './delete-patient'
import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: DeletePatientUseCase

describe('[DELETE]:PATIENT', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new DeletePatientUseCase(inMemoryPatientRepository)
  })

  it('should be able to delete a patient', async () => {
    const patient = await makePatient({
      firstName: 'paulinho',
    })

    await inMemoryPatientRepository.create(patient)

    await sut.execute({ patientId: patient.id })

    expect(inMemoryPatientRepository.patients).toHaveLength(0)
  })
})
