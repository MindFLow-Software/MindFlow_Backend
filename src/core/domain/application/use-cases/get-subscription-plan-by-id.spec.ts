import { makeSubscriptionPlan } from 'test/factories/make-subscription-plan'
import { GetSubscriptionPlanByIdUseCase } from './get-subscription-plan-by-id'
import { InMemorySubscriptionPlanRepository } from 'test/repositories/in-memory-subscription-plan-repository'
import { randomUUID } from 'node:crypto'

let inMemorySubscriptionPlanRepository: InMemorySubscriptionPlanRepository
let sut: GetSubscriptionPlanByIdUseCase

describe('[GET]:SUBSCRIPTION-PLAN:ID', () => {
  beforeEach(() => {
    inMemorySubscriptionPlanRepository =
      new InMemorySubscriptionPlanRepository()
    sut = new GetSubscriptionPlanByIdUseCase(inMemorySubscriptionPlanRepository)
  })

  it('should be able to get a subscription plan', async () => {
    const subscriptionPlanId = randomUUID()

    await inMemorySubscriptionPlanRepository.create(
      await makeSubscriptionPlan({
        id: subscriptionPlanId,
        name: 'plan 1',
        priceInCents: 5000,
      }),
    )

    const { subscriptionPlan } = await sut.execute({ id: subscriptionPlanId })

    expect(subscriptionPlan).toEqual(
      expect.objectContaining({
        name: 'plan 1',
        priceInCents: 5000,
      }),
    )
  })
})
