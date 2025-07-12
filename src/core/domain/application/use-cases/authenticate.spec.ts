import { makePsychologist } from 'test/factories/make-psychologist'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryPsychologistRespository } from 'test/repositories/in-memory-psychologist-repository'
import { hash } from 'bcryptjs'

let psychologistRepository: InMemoryPsychologistRespository
let sut: AuthenticateUseCase

describe('[POST]:SESSION', () => {
  beforeEach(() => {
    psychologistRepository = new InMemoryPsychologistRespository()
    sut = new AuthenticateUseCase(psychologistRepository)
  })

  it('should be able to authenticate a user', async () => {
    psychologistRepository.create(
      await makePsychologist({
        firstName: 'paulinho',
        email: 'paulinho@gmail.com',
        password: await hash('123456', 10),
      }),
    )

    const { psychologist } = await sut.execute({
      email: 'paulinho@gmail.com',
      password: '123456',
    })

    expect(psychologist).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        email: 'paulinho@gmail.com',
      }),
    )
  })

  it('should not be able to authenticate with wrong password', async () => {
    psychologistRepository.create(
      await makePsychologist({
        firstName: 'paulinho',
        email: 'paulinho@gmail.com',
        password: await hash('123456', 10),
      }),
    )

    const { psychologist } = await sut.execute({
      email: 'paulinho@gmail.com',
      password: '123456',
    })

    expect(psychologist).toEqual(
      expect.objectContaining({
        firstName: 'paulinho',
        email: 'paulinho@gmail.com',
      }),
    )
  })
})
