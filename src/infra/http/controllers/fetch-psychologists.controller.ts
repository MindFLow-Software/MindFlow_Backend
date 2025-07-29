import { Controller, Get, Query } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { FetchPsychologistUseCase } from '@/core/domain/main/application/use-cases/fetch-psychologists'

const fetchPsychologistsQuerySchema = z.object({
  pageIndex: z.coerce.number().default(0),
  perPage: z.coerce.number().default(10),
})

type IfetchPsychologistsQuery = z.infer<typeof fetchPsychologistsQuerySchema>

const fetchPsychologistsQueryValidationPipe = new ZodValidationPipe(fetchPsychologistsQuerySchema)

@Controller('/psychologists')
export class FetchPsychologistController {
  constructor(
    private fetchPsychologistsUseCase: FetchPsychologistUseCase
  ) { }

  @Get()
  async execute(@Query(fetchPsychologistsQueryValidationPipe) query: IfetchPsychologistsQuery) {
    const { perPage, pageIndex } = query

    const { psychologists } = await this.fetchPsychologistsUseCase.execute({
      perPage,
      pageIndex,
    })

    return {
      psychologists
    }
  }
}
