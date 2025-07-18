import { Injectable } from '@nestjs/common'
import { SubscriptionPlan } from '../../enterprise/entities/subscription-plan'
import { SubscriptionPlanRepository } from '../repositories/subscription-plan-repository'

// type IfetchSubscriptionPlansRequest = {}

type IfetchSubscriptionPlansReponse = {
  subscriptionPlans: SubscriptionPlan[]
}

@Injectable()
export class FetchSubscriptionPlansUseCase {
  constructor(private subscriptionPlanRepository: SubscriptionPlanRepository) { }

  async execute(): Promise<IfetchSubscriptionPlansReponse> {
    const subscriptionPlans = await this.subscriptionPlanRepository.findMany()

    return {
      subscriptionPlans,
    }
  }
}
