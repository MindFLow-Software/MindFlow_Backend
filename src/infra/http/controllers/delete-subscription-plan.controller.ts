import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { DeleteSubscriptionPlanUseCase } from '@/core/domain/application/use-cases/delete-subscription-plan'

const deleteSubscriptionPlanParamsSchema = z.object({
  planId: z.string(),
})

type IdeleteSubscriptionPlanParams = z.infer<typeof deleteSubscriptionPlanParamsSchema>

const deleteSubscriptionPlanParamsValidationPipe = new ZodValidationPipe(deleteSubscriptionPlanParamsSchema)

@Controller('/subcription-plan')
export class DeleteSubscriptionPlanController {
  constructor(
    private deleteSubscriptionPlanUseCase: DeleteSubscriptionPlanUseCase
  ) {}

  @Delete(':planId')
  @HttpCode(204)
  async handle(@Param(deleteSubscriptionPlanParamsValidationPipe) params: IdeleteSubscriptionPlanParams) {
    const { planId } = params

    await this.deleteSubscriptionPlanUseCase.execute({ planId })
  }
}