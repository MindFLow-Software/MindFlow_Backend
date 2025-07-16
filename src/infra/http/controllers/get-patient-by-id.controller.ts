import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetPatientByIdUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-id'

const getPatientByIdParamsSchema = z.object({
  id: z.uuid(),
})

type IgetPatientByIdParams = z.infer<typeof getPatientByIdParamsSchema>

const getPatientByIdParamsValidationPipe = new ZodValidationPipe(getPatientByIdParamsSchema)

@Controller('/patients')
export class GetPatientByIdController {
    constructor(private getPatientByIdUseCase: GetPatientByIdUseCase) { }

    @Get(':id')
    async handle(@Param(getPatientByIdParamsValidationPipe) params: IgetPatientByIdParams) {
        const { id } = params

        const { patient } = await this.getPatientByIdUseCase.execute({ id })
        
        return {
          patient
        }
    }
}
