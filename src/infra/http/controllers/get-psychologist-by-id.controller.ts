import { Controller, Get, Param } from '@nestjs/common'
import { GetPsychologistByIdUseCase } from '@/core/domain/application/use-cases/get-psychologist-by-id'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const getPsychologistParamsSchema = z.object({
  id: z.string().uuid(),
})

const getPsychologistParamsValidationPipe = new ZodValidationPipe(
  getPsychologistParamsSchema,
)

type IgetPsychologistParams = z.infer<typeof getPsychologistParamsSchema>

@Controller()
export class GetPsychologistByIdController {
  constructor(private getPsychologistById: GetPsychologistByIdUseCase) {}

  @Get('/psychologist:id')
  async handle(
    @Param(getPsychologistParamsValidationPipe) params: IgetPsychologistParams,
  ) {
    const { id } = params

    this.getPsychologistById.execute({
      id,
    })
  }
}
