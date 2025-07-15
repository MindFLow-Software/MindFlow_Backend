import { Injectable } from '@nestjs/common'
import { SubscriptionPlan } from '../../enterprise/entities/subscription-plan'
import { SubscriptionPlanRepository } from '../repositories/subscription-plan-repository'

type IfindSubscriptionPlanByIdRequest = {
  id: string
}

type IfindSubscriptionPlanByIdResponse = {
  subscriptionPlan: SubscriptionPlan | null
}

@Injectable()
export class GetSubscriptionPlanByIdUseCase {
  constructor(private subscriptionPlanRepository: SubscriptionPlanRepository) {}

  async execute({
    id,
  }: IfindSubscriptionPlanByIdRequest): Promise<IfindSubscriptionPlanByIdResponse> {
    const subscriptionPlan = await this.subscriptionPlanRepository.findById(id)

    return {
      subscriptionPlan,
    }
  }
}
