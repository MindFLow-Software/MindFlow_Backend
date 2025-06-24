import { SubscriptionPlanRepository } from '@/core/domain/application/repositories/subscription-plan-repository'
import { SubscriptionPlan } from '@/core/domain/enterprise/entities/subscription-plan'

export class InMemorySubscriptionPlanRepository
  implements SubscriptionPlanRepository
{
  public subscriptionPlans: SubscriptionPlan[] = []

  constructor() {}

  async create(subscriptionplan: SubscriptionPlan): Promise<void> {
    this.subscriptionPlans.push(subscriptionplan)
  }

  async save(subscriptionplan: SubscriptionPlan): Promise<void> {
    const subscriptionPlanToUdateIndex = this.subscriptionPlans.findIndex(
      ({ id }) => id === subscriptionplan.id,
    )

    this.subscriptionPlans[subscriptionPlanToUdateIndex] = subscriptionplan
  }

  async delete(id: string): Promise<void> {
    this.subscriptionPlans.filter(
      (subscriptionplan) => subscriptionplan.id !== id,
    )
  }

  async findById(id: string): Promise<SubscriptionPlan | null> {
    return (
      this.subscriptionPlans.find(
        (subscriptionplan) => subscriptionplan.id === id,
      ) || null
    )
  }

  async findMany(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlans
  }
}
