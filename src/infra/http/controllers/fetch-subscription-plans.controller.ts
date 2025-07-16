import { Controller, Get } from '@nestjs/common'

import { FetchSubscriptionPlansUseCase } from '@/core/domain/main/application/use-cases/fetch-subscription-plans'


@Controller('/plans')
export class FetchSubscriptionPlanController {
  constructor(
    private fetchSubscriptionPlansUseCase: FetchSubscriptionPlansUseCase
  ) {}

  @Get()
  async handle() {
    const { subscriptionPlans } = await this.fetchSubscriptionPlansUseCase.execute()

    return {
      subscriptionPlans,
    }
  }
}
