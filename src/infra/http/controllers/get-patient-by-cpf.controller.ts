import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { GetPatientByCpfUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-cpf'

const getPatientParamsSchema = z.object({
  cpf: z.string().min(11).max(14),
})

type IGetPatientByCpfParams = z.infer<typeof getPatientParamsSchema>

const getPatientParamsValidationPipe = new ZodValidationPipe(getPatientParamsSchema)

@Controller('/patients')
export class GetPatientByCpfController {
    constructor(private getPatientByCpfUseCase: GetPatientByCpfUseCase) { }

    @Get(':cpf')
    async handle(@Param(getPatientParamsValidationPipe) params: IGetPatientByCpfParams) {
        const { cpf } = params

        const { patient } = await this.getPatientByCpfUseCase.execute({ cpf })

        return {
          patient,
        }
    }
}
