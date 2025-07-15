import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { DeletePsychologistUseCase } from '@/core/domain/application/use-cases/delete-psychologist'

const deletePsychologistParamsSchema = z.object({
  psychologistId: z.string(),
})

type IdeletePsychologistParams = z.infer<typeof deletePsychologistParamsSchema>

const deletePsychologistParamsValidationPipe = new ZodValidationPipe(deletePsychologistParamsSchema)

@Controller('/psychologist')
export class DeletePsychologistController {
  constructor(
    private deletePsychologistUseCase: DeletePsychologistUseCase
  ) {}

  @Delete(':psychologistId')
  @HttpCode(204)
  async handle(@Param(deletePsychologistParamsValidationPipe) params: IdeletePsychologistParams) {
    const { psychologistId } = params

    await this.deletePsychologistUseCase.execute({ psychologistId })
  }
}
