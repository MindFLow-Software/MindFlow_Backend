import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetAppointmentByIdUseCase } from '@/core/domain/main/application/use-cases/get-appointment'

const getAppointmentsParamsSchema = z.object({
  id: z.uuid(),
})

type IgetAppointmentsParams = z.infer<typeof getAppointmentsParamsSchema>

const getAppointmentsParamsValidationPipe = new ZodValidationPipe(getAppointmentsParamsSchema)

@Controller('/appointments')
export class GetAppointmentByIdController {
    constructor(private getAppointmentByIdUseCase: GetAppointmentByIdUseCase) {}

    @Get(':id')
    async handle(@Param(getAppointmentsParamsValidationPipe) params: IgetAppointmentsParams) {
      const { id } = params

      const { appointment } = await this.getAppointmentByIdUseCase.execute({ id })

      return {
        appointment,
      }
    }
}