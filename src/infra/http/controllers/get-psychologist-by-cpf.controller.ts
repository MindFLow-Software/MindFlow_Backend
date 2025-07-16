import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetPsychologistByCpfUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-cpf'

const getPsychologistByCpfParamsSchema = z.object({
  cpf: z.string().min(11).max(14),
})

type IgetPsychologistByCpfParams = z.infer<typeof getPsychologistByCpfParamsSchema>

const getPsychologistByCpfParamsValidationPipe = new ZodValidationPipe(getPsychologistByCpfParamsSchema)

@Controller('/psychologists')
export class GetPsychologistByCpfController {
    constructor(private getPsychologistByCpfUseCase: GetPsychologistByCpfUseCase) {}

    @Get(':cpf')
    async handle(@Param(getPsychologistByCpfParamsValidationPipe) params: IgetPsychologistByCpfParams) {
      const { cpf } = params
        
      const { psychologist } = await this.getPsychologistByCpfUseCase.execute({ cpf })

      return {
        psychologist
      }
    }
}
