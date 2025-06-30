import { makePsychologist } from 'test/factories/make-psychologist'
import { DeletePsychologistUseCase } from './delete-psychologist'
import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: DeletePsychologistUseCase

describe('[DELETE]:PSYCHOLOGIST', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new DeletePsychologistUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to delete a psychologist', async () => {
    const psychologist = await makePsychologist({
      firstName: 'paulinho',
    })

    await inMemoryPsychologistRepository.create(psychologist)

    await sut.execute({ id: psychologist.id })

    expect(inMemoryPsychologistRepository.psychologists).toHaveLength(0)
  })
})
