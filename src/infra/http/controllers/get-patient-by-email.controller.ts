import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetPatientByEmailUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-email'

const getPatientByEmailParamsSchema = z.object({
  email: z.email(),
})

type IgetPatientByEmailParams = z.infer<typeof getPatientByEmailParamsSchema>

const getPatientByEmailParamsValidationPipe = new ZodValidationPipe(getPatientByEmailParamsSchema)

@Controller('/patients')
export class GetPatientByEmailController {
    constructor(private getPatientByEmailUseCase: GetPatientByEmailUseCase) {}

    @Get(':email')
    async handle(@Param(getPatientByEmailParamsValidationPipe) params: IgetPatientByEmailParams) {
        const { email } = params

        const { patient } = await this.getPatientByEmailUseCase.execute({ email })

        return {
          patient,
        }
    }
}
