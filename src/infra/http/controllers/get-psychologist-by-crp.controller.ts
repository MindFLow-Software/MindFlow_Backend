import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetPsychologistByCrpUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-crp'

const getPsychologistByCrpParamsSchema = z.object({
  crp: z.string()
})

type IgetPsychologistByCrpParams = z.infer<typeof getPsychologistByCrpParamsSchema>

const getPsychologistByCrpParamsValidationPipe = new ZodValidationPipe(getPsychologistByCrpParamsSchema)

@Controller('/psychologists')
export class GetPsychologistByCrpController {
    constructor(private getPsychologistByCrpUseCase: GetPsychologistByCrpUseCase) {}

    @Get(':crp')
    async handle(@Param(getPsychologistByCrpParamsValidationPipe) params: IgetPsychologistByCrpParams) {
      const { crp } = params

      const { psychologist } = await this.getPsychologistByCrpUseCase.execute({ crp })

      return {
        psychologist,
      }
    }
}
