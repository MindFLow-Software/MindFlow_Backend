import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'
import { GetPatientByCpfUseCase } from './get-patient-by-cpf'
import { makePatient } from 'test/factories/make-patient'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: GetPatientByCpfUseCase

describe('[GET]:PATIENT:CPF', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new GetPatientByCpfUseCase(inMemoryPatientRepository)
  })

  it('should be able to get a patient by cpf', async () => {
    const patientCpf = '45719845976'

    inMemoryPatientRepository.create(
      await makePatient({
        firstName: 'paulinho',
        cpf: patientCpf,
      }),
    )

    const { patient } = await sut.execute({ cpf: patientCpf })

    expect(patient).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        cpf: patientCpf,
      }),
    )
  })
})
