import { makeSubscriptionPlan } from 'test/factories/make-subscription-plan'
import { DeleteSubscriptionPlanUseCase } from './delete-subscription-plan'
import { InMemorySubscriptionPlanRepository } from 'test/repositories//in-memory-subscription-plan-repository'

let inMemorySubscriptionPlanRepository: InMemorySubscriptionPlanRepository
let sut: DeleteSubscriptionPlanUseCase

describe('[DELETE]:SUBSCRIPTION-PLAN ', () => {
  beforeEach(() => {
    inMemorySubscriptionPlanRepository =
      new InMemorySubscriptionPlanRepository()
    sut = new DeleteSubscriptionPlanUseCase(inMemorySubscriptionPlanRepository)
  })

  it('should be able to delete a subscription', async () => {
    const psychologist = await makeSubscriptionPlan({
      name: 'Basic Plan',
    })

    await inMemorySubscriptionPlanRepository.create(psychologist)

    await sut.execute({ planId: psychologist.id })

    expect(inMemorySubscriptionPlanRepository.subscriptionPlans).toHaveLength(0)
  })
})
