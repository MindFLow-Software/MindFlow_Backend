import { faker } from '@faker-js/faker'
import { CreateSubscriptionPlanUseCase } from './create-subscription-plan'
import { InMemorySubscriptionPlanRepository } from 'test/repositories/in-memory-subscription-plan-repository'
import { PlanInterval } from '../../enterprise/entities/subscription-plan'

let inMemorySubscriptionPlanRepository: InMemorySubscriptionPlanRepository
let sut: CreateSubscriptionPlanUseCase

describe('[POST]:SUBSCRIPTION-PLAN', () => {
  beforeEach(() => {
    inMemorySubscriptionPlanRepository =
      new InMemorySubscriptionPlanRepository()
    sut = new CreateSubscriptionPlanUseCase(inMemorySubscriptionPlanRepository)
  })

  it('should be able to create a subscription plan', async () => {
    await sut.execute({
      name: 'plan 1',
      description: [faker.lorem.text()],
      interval: PlanInterval.MONTHLY,
      priceInCents: 5000,
    })

    expect(inMemorySubscriptionPlanRepository.subscriptionPlans).toHaveLength(1)
    expect(inMemorySubscriptionPlanRepository.subscriptionPlans[0]).toEqual(
      expect.objectContaining({
        name: 'plan 1',
        interval: 'MONTHLY',
        priceInCents: 5000,
      }),
    )
  })
})
