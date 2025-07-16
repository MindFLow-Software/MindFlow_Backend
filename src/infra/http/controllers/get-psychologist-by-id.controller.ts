import { Controller, Get, Param } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { GetPsychologistByIdUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-id'

const getPsychologistParamsSchema = z.object({
  id: z.uuid(),
})

const getPsychologistParamsValidationPipe = new ZodValidationPipe(
  getPsychologistParamsSchema,
)

type IgetPsychologistParams = z.infer<typeof getPsychologistParamsSchema>

@Controller('/psychologists')
export class GetPsychologistByIdController {
  constructor(private getPsychologistByIdUseCase: GetPsychologistByIdUseCase) {}

  @Get(':id')
  async handle(
    @Param(getPsychologistParamsValidationPipe) params: IgetPsychologistParams,
  ) {
    const { id } = params

    const { psychologist } = await this.getPsychologistByIdUseCase.execute({ id })

    return {
      psychologist,
    }
  }
}
