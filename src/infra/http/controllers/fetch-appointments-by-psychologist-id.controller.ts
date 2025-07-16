import { Controller, Get, Param, Query } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { FetchAppointmentsByPsychologistIdUseCase } from '@/core/domain/main/application/use-cases/fetch-appointments-by-psychologist-id'

const fetchAppointmentsByPsycholgistParamsSchema = z.object({
  psychologistId: z.uuid(),
})

type IfetchAppointmentsByPsycholgistParams = z.infer<typeof fetchAppointmentsByPsycholgistParamsSchema>

const fetchAppointmentsByPsycholgistParamsValidationPipe = new ZodValidationPipe(fetchAppointmentsByPsycholgistParamsSchema)


const fetchAppointmentsByPsychologistQuerySchema = z.object({
  pageIndex: z.coerce.number().default(0),
  perPage: z.coerce.number().default(10),
  orderBy: z.enum(['asc', 'desc']).default('asc'),
})

type IfetchAppointmentsByPsycholgistQuery = z.infer<typeof fetchAppointmentsByPsychologistQuerySchema>

const fetchAppointmentsByPsycholgistQueryValidationPipe = new ZodValidationPipe(fetchAppointmentsByPsychologistQuerySchema)

@Controller('/appointments')
export class FetchAppointmentsByPsychologistIdController {
  constructor(
    private fetchAppointmentsByPsychologistIdUseCase: FetchAppointmentsByPsychologistIdUseCase
  ) { }

  @Get(':psychologistId')
  async handle(
    @Param(fetchAppointmentsByPsycholgistParamsValidationPipe) params: IfetchAppointmentsByPsycholgistParams,
    @Query(fetchAppointmentsByPsycholgistQueryValidationPipe) query: IfetchAppointmentsByPsycholgistQuery,
  ) {
    const { psychologistId } = params
    const {
      pageIndex,
      perPage,
      orderBy,
    } = query

    const { appointments } = await this.fetchAppointmentsByPsychologistIdUseCase.execute({
      pageIndex,
      perPage,
      orderBy,
      psychologistId,
    })

    return {
      appointments,
    }
  }
}