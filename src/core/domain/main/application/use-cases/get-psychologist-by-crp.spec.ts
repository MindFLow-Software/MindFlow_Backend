import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { GetPsychologistByCrpUseCase } from './get-psychologist-by-crp'
import { makePsychologist } from 'test/factories/make-psychologist'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: GetPsychologistByCrpUseCase

describe('[GET]:PSYCHOLOGIST:CRP', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new GetPsychologistByCrpUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to get a psychologist by crp', async () => {
    const psychologistCrp = '06/123456'

    inMemoryPsychologistRepository.create(
      await makePsychologist({
        firstName: 'paulinho',
        crp: psychologistCrp,
      }),
    )

    const { psychologist } = await sut.execute({ crp: psychologistCrp })

    expect(psychologist).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        crp: '06/123456',
      }),
    )
  })
})
