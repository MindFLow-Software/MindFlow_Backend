import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { FetchPsychologistUseCase } from './fetch-psychologists'
import { makePsychologist } from 'test/factories/make-psychologist'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: FetchPsychologistUseCase

describe('[GET]:PSYCHOLOGISTS', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new FetchPsychologistUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to fetch paginated psychologists', async () => {
    const PAGE_INDEX = 0
    const PER_PAGE = 2

    for (let i = 0; i <= 20; i++) {
      inMemoryPsychologistRepository.create(
        await makePsychologist({
          firstName: `paulinho ${i + 1}`,
        }),
      )
    }

    const { psychologists } = await sut.execute({
      pageIndex: PAGE_INDEX,
      perPage: PER_PAGE,
    })

    expect(psychologists).toHaveLength(2)
    expect(psychologists).toEqual([
      expect.objectContaining({
        firstName: 'paulinho 1',
        role: 'PSYCHOLOGIST',
      }),
      expect.objectContaining({
        firstName: 'paulinho 2',
        role: 'PSYCHOLOGIST',
      }),
    ])
  })
})
