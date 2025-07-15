import { Controller, Get, Query } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { FetchPatientsUseCase } from '@/core/domain/application/use-cases/fetch-patients'

const fetchPatientsQuerySchema = z.object({
  pageIndex: z.coerce.number().default(0),
  perPage: z.coerce.number().default(10),
})

type IfetchPatientsQuery = z.infer<typeof fetchPatientsQuerySchema>

const fetchPatientsQueryValidationPipe = new ZodValidationPipe(fetchPatientsQuerySchema)

@Controller('/patients')
export class FetchPatientsController {
  constructor(
    private fetchPatientsUseCase: FetchPatientsUseCase
  ) {}

  @Get()
  async handle(@Query(fetchPatientsQueryValidationPipe) query: IfetchPatientsQuery) {
    const {
      pageIndex,
      perPage,
    } = query

    const { patients } = await this.fetchPatientsUseCase.execute({
      pageIndex,
      perPage,
    })

    return {
      patients,
    }
  }
}
