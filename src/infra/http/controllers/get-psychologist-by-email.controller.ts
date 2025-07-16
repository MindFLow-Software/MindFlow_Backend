import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetPsychologistByEmailUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-email'

const getPsychologistByEmailParamsSchema = z.object({
  email: z.email(),
})

type IgetPsychologistByEmailParams = z.infer<typeof getPsychologistByEmailParamsSchema>

const getPsychologistByEmailParamsValidationPipe = new ZodValidationPipe(getPsychologistByEmailParamsSchema)

@Controller('/psychologists')
export class GetPsychologistByEmailController {
    constructor(private getPsychologistByEmailUseCase: GetPsychologistByEmailUseCase) {}

    @Get(':email')
    async handle(@Param(getPsychologistByEmailParamsValidationPipe) params: IgetPsychologistByEmailParams) {
      const { email } = params

      const { psychologist } = await this.getPsychologistByEmailUseCase.execute({ email })

      return {
        psychologist,
      }
    }
}
