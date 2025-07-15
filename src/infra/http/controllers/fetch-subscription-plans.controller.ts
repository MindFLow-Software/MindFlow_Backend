import { FetchSubscriptionPlansUseCase } from '@/core/domain/application/use-cases/fetch-subscription-plans'

export class FetchSubscriptionPlanController {
  constructor(
    private fetchSubscriptionPlansUseCase: FetchSubscriptionPlansUseCase
  ) {}

  async handle() {
    const { subscriptionPlans } = await this.fetchSubscriptionPlansUseCase.execute()

    return {
      subscriptionPlans,
    }
  }
}
