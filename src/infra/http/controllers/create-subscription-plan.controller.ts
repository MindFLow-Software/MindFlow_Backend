import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { PlanInterval } from '@/core/domain/enterprise/entities/subscription-plan'
import { CreateSubscriptionPlanUseCase } from '@/core/domain/application/use-cases/create-subscription-plan'

const createSubscriptionPlanBodySchema = z.object({
  name: z.string(),
  description: z.array(z.string()),
  priceInCents: z.number(),
  interval: z.enum(PlanInterval),
})

type IcreateSubscriptionPlanBody = z.infer<typeof createSubscriptionPlanBodySchema>

const createSubscriptionPlanValidationPipe = new ZodValidationPipe(createSubscriptionPlanBodySchema)

@Controller('/subscription-plan')
export class CreateSubscriptionPlanController {
  constructor(
    private createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(createSubscriptionPlanValidationPipe) body: IcreateSubscriptionPlanBody) {
    const {
      name,
      description,
      priceInCents,
      interval,
    } = body

    await this.createSubscriptionPlanUseCase.execute({
      name,
      description,
      priceInCents,
      interval,
    })
  }
}