import { Controller, Get, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

import { GetSubscriptionPlanByIdUseCase } from '@/core/domain/main/application/use-cases/get-subscription-plan-by-id'

const getPlanByIdParamsSchema = z.object({
  id: z.uuid(),
})

type IgetPlanByIdParams = z.infer<typeof getPlanByIdParamsSchema>

const getPlanByIdParamsValidationPipe = new ZodValidationPipe(getPlanByIdParamsSchema)

@Controller('/plans')
export class GetSubscriptionPlanByIdController {
    constructor(private getSubscriptionPlanByIdUseCase: GetSubscriptionPlanByIdUseCase) {}

    @Get(':id')
    async handle(@Param(getPlanByIdParamsValidationPipe) params: IgetPlanByIdParams) {
      const { id } = params

      const { subscriptionPlan } = await this.getSubscriptionPlanByIdUseCase.execute({ id })

      return {
        subscriptionPlan,
      }
    }
}
