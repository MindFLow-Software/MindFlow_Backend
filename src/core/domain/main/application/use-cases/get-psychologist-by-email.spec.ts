import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { GetPsychologistByEmailUseCase } from './get-psychologist-by-email'
import { makePsychologist } from 'test/factories/make-psychologist'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: GetPsychologistByEmailUseCase

describe('[GET]:PSYCHOLOGIST:EMAIL', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new GetPsychologistByEmailUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to get a psychologist by email', async () => {
    const psychologistEmail = 'paulinho@test.com'

    inMemoryPsychologistRepository.create(
      await makePsychologist({
        email: psychologistEmail,
      }),
    )

    const { psychologist } = await sut.execute({ email: psychologistEmail })

    expect(psychologist).toEqual(
      expect.objectContaining({
        email: psychologistEmail,
      }),
    )
  })
})
