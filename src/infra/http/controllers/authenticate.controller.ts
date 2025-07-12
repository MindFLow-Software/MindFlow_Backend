import { AuthenticateUseCase } from '@/core/domain/application/use-cases/authenticate'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { Body, Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import z from 'zod'

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type IauthenticateBody = z.infer<typeof authenticateBodySchema>

const authenticateValidationPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('/session')
export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,
    private JWT: JwtService,
  ) {}

  @Post()
  async handle(@Body(authenticateValidationPipe) body: IauthenticateBody) {
    const { email, password } = body

    const { psychologist } = await this.authenticateUseCase.execute({
      email,
      password,
    })

    const jwt = await this.JWT.sign({ sub: psychologist?.id })

    return {
      jwt,
    }
  }
}
