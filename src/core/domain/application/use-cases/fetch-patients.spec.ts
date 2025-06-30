import { FetchPatientsUseCase } from './fetch-patients'
import { InMemoryPatientRespository } from 'test/repositories/in-memory-patient-repository'

import { makePatient } from 'test/factories/make-patient'

let inMemoryPatientRepository: InMemoryPatientRespository
let sut: FetchPatientsUseCase

describe('[GET]:PATIENTS', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRespository()
    sut = new FetchPatientsUseCase(inMemoryPatientRepository)
  })

  it('should be able to fetch paginated patients', async () => {
    const PAGE_INDEX = 0
    const PER_PAGE = 2

    for (let i = 0; i <= 20; i++) {
      inMemoryPatientRepository.create(
        await makePatient({
          firstName: `paulinho ${i + 1}`,
        }),
      )
    }

    const { patients } = await sut.execute({
      pageIndex: PAGE_INDEX,
      perPage: PER_PAGE,
    })

    expect(patients).toEqual([
      expect.objectContaining({
        firstName: 'paulinho 1',
        role: 'PATIENT',
      }),
      expect.objectContaining({
        firstName: 'paulinho 2',
        role: 'PATIENT',
      }),
    ])
  })
})
