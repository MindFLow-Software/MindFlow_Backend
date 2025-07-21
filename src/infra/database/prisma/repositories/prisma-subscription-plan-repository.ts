import { Injectable } from '@nestjs/common'

import { SubscriptionPlanRepository } from '@/core/domain/main/application/repositories/subscription-plan-repository'
import { SubscriptionPlan } from '@/core/domain/main/enterprise/entities/subscription-plan'

@Injectable()
export class PrismaSubscriptionPlanRepository implements SubscriptionPlanRepository {
  constructor() {}

  async create(subscriptionplan: SubscriptionPlan) {}

  async save(subscriptionplan: SubscriptionPlan) {}

  async findById(id: string) {}

  async findMany() {}

  async delete(id: string) {}
}
