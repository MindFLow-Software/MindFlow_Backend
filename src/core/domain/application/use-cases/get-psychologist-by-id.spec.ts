import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { GetPsychologistByIdUseCase } from './get-psychologist-by-id'
import { makePsychologist } from 'test/factories/make-psychologist'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: GetPsychologistByIdUseCase

describe('[GET]:PSYCHOLOGIST', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new GetPsychologistByIdUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to get a psychologist by id', async () => {
    const psychologist = await makePsychologist({
      firstName: 'paulinho',
      email: 'paulinho@test.com',
    })

    inMemoryPsychologistRepository.create(psychologist)

    const { psychologist: foundPsychologist } = await sut.execute({
      id: psychologist.id,
    })

    expect(foundPsychologist).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        email: 'paulinho@test.com',
      }),
    )
  })
})
