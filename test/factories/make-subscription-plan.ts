import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import {
  IsubscriptionPlan,
  PlanInterval,
  SubscriptionPlan,
} from '@/core/domain/enterprise/entities/subscription-plan'

export const makeSubscriptionPlan = async (
  override: Partial<IsubscriptionPlan> = {},
) => {
  const subscriptionplan = SubscriptionPlan.create({
    id: randomUUID(),
    name: 'Premium Plan',
    description: Array.from({ length: 5 }).map(() => faker.lorem.text()),
    priceInCents: Math.round(Math.random() * 5000),
    interval: PlanInterval.MONTHLY,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  })

  return subscriptionplan
}
