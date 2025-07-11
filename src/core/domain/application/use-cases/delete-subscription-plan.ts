import { SubscriptionPlanRepository } from '../repositories/subscription-plan-repository'

type IdeleteSubscriptionPlanRequest = {
  planId: string
}

export class DeleteSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute({ planId }: IdeleteSubscriptionPlanRequest) {
    await this.subscriptionPlanRepository.delete(planId)
  }
}
