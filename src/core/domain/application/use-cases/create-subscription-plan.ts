import { Injectable } from '@nestjs/common'
import {
  PlanInterval,
  SubscriptionPlan,
} from '../../enterprise/entities/subscription-plan'
import { SubscriptionPlanRepository } from '../repositories/subscription-plan-repository'

type IcreateSubscriptionPlanRequest = {
  name: string
  description: string[]
  priceInCents: number
  interval: PlanInterval
}

@Injectable()
export class CreateSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute(data: IcreateSubscriptionPlanRequest) {
    const subscriptionPlan = SubscriptionPlan.create({
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      interval: data.interval,
    })

    await this.subscriptionPlanRepository.create(subscriptionPlan)
  }
}
