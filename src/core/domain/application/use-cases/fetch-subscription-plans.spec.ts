import { makeSubscriptionPlan } from 'test/factories/make-subscription-plan'
import { InMemorySubscriptionPlanRepository } from 'test/repositories/in-memory-subscription-plan-repository'
import { FetchSubscriptionPlansUseCase } from './fetch-subscription-plans'

let inMemorySubscriptionPlanRepository: InMemorySubscriptionPlanRepository
let sut: FetchSubscriptionPlansUseCase

describe('[GET]:SUBSCRIPTION-PLAN', () => {
  beforeEach(() => {
    inMemorySubscriptionPlanRepository =
      new InMemorySubscriptionPlanRepository()
    sut = new FetchSubscriptionPlansUseCase(inMemorySubscriptionPlanRepository)
  })

  it('should be able to fetch subscription plans', async () => {
    for (let i = 1; i <= 4; i++) {
      inMemorySubscriptionPlanRepository.create(
        await makeSubscriptionPlan({
          name: `plan ${i}`,
        }),
      )
    }

    const { subscriptionPlans } = await sut.execute()

    expect(subscriptionPlans).toHaveLength(4)
    expect(subscriptionPlans).toEqual([
      expect.objectContaining({
        name: 'plan 1',
      }),
      expect.objectContaining({
        name: 'plan 2',
      }),
      expect.objectContaining({
        name: 'plan 3',
      }),
      expect.objectContaining({
        name: 'plan 4',
      }),
    ])
  })
})
