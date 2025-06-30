import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { GetPsychologistByCpfUseCase } from './get-psychologist-by-cpf'
import { makePsychologist } from 'test/factories/make-psychologist'

let inMemoryPsychologistRepository: InMemoryPsychologistRespository
let sut: GetPsychologistByCpfUseCase

describe('[GET]:PSYCHOLOGIST:CPF', () => {
  beforeEach(() => {
    inMemoryPsychologistRepository = new InMemoryPsychologistRespository()
    sut = new GetPsychologistByCpfUseCase(inMemoryPsychologistRepository)
  })

  it('should be able to get a psychologist by cpf', async () => {
    const psychologistCpf = '45719845976'

    inMemoryPsychologistRepository.create(
      await makePsychologist({
        firstName: 'paulinho',
        cpf: psychologistCpf,
      }),
    )

    const { psychologist } = await sut.execute({ cpf: psychologistCpf })

    expect(psychologist).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        cpf: psychologistCpf,
      }),
    )
  })
})
