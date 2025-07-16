import { Injectable } from '@nestjs/common'
import { SubscriptionPlanRepository } from '../repositories/subscription-plan-repository'

type IdeleteSubscriptionPlanRequest = {
  planId: string
}

@Injectable()
export class DeleteSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute({ planId }: IdeleteSubscriptionPlanRequest) {
    await this.subscriptionPlanRepository.delete(planId)
  }
}
