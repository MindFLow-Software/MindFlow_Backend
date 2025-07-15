import { Controller, Get, Query } from '@nestjs/common'

import { FetchAppointmentsUseCase } from '@/core/domain/application/use-cases/fetch-appointments'
import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const fetchAppointmentsQuerySchema = z.object({
  pageIndex: z.coerce.number().default(0),
  perPage: z.coerce.number().default(10),
  orderBy: z.enum(['asc', 'desc']).default('asc'),
})

type IfetchAppointmentsQuery = z.infer<typeof fetchAppointmentsQuerySchema>

const fetchAppointmentsQueryValidationPipe = new ZodValidationPipe(fetchAppointmentsQuerySchema)

@Controller('/appointments')
export class FetchAppointmentsController {
  constructor(
    private fetchAppointmentsUseCase: FetchAppointmentsUseCase
  ) {}

  @Get()
  async handle(@Query(fetchAppointmentsQueryValidationPipe) query: IfetchAppointmentsQuery) {
    const {
      pageIndex,
      perPage,
      orderBy,
    } = query

    const { appointments } = await this.fetchAppointmentsUseCase.execute({
      pageIndex,
      perPage,
      orderBy,
    })

    return {
      appointments
    }
  }
}