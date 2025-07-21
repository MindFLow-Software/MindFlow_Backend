import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import z from 'zod'

import { AuthenticateUseCase } from '@/core/domain/main/application/use-cases/authenticate'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PsychologistRepository } from '@/core/domain/main/application/repositories/psychologist-repository'

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
    private jwtService: JwtService,
    private psychologistsRepository: PsychologistRepository,
  ) {}

  @Post()
  async handle(@Body(authenticateValidationPipe) body: IauthenticateBody) {
    const { email, password } = body

    const { psychologist } = await this.authenticateUseCase.execute({
      email,
      password,
    })

    if (!psychologist) {
      throw new Error('Authentication failed: psychologist not found.')
    }

    const jwt = await this.jwtService.signAsync({ sub: psychologist.id })

    return { jwt }
  }

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin() {
  }

  @Get('/linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinCallback(@Req() req, @Res() res: Response) {
    const linkedInUser = req.user as {
      id: string
      name: string
      email: string
      avatar?: string
    }

    let psychologist = await this.psychologistsRepository.findByEmail(linkedInUser.email)

    if (!psychologist) {
      psychologist = await this.psychologistsRepository.createFromLinkedIn({
        email: linkedInUser.email,
        name: linkedInUser.name,
        avatar: linkedInUser.avatar,
      })
    }

    if (!psychologist) {
      throw new Error('Authentication failed: psychologist not found.')
    }

    const jwt = await this.jwtService.signAsync({
      sub: psychologist.id,
    })

    return res.json({ jwt })


  }
}
