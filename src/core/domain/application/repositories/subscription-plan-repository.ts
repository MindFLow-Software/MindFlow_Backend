import { SubscriptionPlan } from '../../enterprise/entities/subscription-plan'

export abstract class SubscriptionPlanRepository {
  abstract create(subscriptionplan: SubscriptionPlan): Promise<void>
  abstract save(subscriptionplan: SubscriptionPlan): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<SubscriptionPlan | null>
  abstract findMany(): Promise<SubscriptionPlan[]>
}
