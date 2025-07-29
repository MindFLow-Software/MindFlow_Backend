import { Injectable } from '@nestjs/common'

import { SubscriptionPlanRepository } from '@/core/domain/main/application/repositories/subscription-plan-repository'
import { PlanInterval, SubscriptionPlan } from '@/core/domain/main/enterprise/entities/subscription-plan'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSubscriptionPlanRepository implements SubscriptionPlanRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(subscriptionplan: SubscriptionPlan) {
    await this.prisma.subscriptionPlan.create({
      data: subscriptionplan,
    })
  }

  async save(subscriptionplan: SubscriptionPlan) {
    await this.prisma.subscriptionPlan.update({
      where: {
        id: subscriptionplan.id,
      },
      data: subscriptionplan,
    })
  }

  async findById(id: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: {
        id,
      },
    })

    if (!plan) return null

    return SubscriptionPlan.create({
      ...plan,
      interval: PlanInterval[plan.interval],
    })
  }

  async findMany() {
    const plans = await this.prisma.subscriptionPlan.findMany()

    return plans.map((plan) => 
      SubscriptionPlan.create({
        ...plan,
        interval: PlanInterval[plan.interval],
      })
    )
  }

  async delete(id: string) {
    await this.prisma.subscriptionPlan.delete({
      where: {
        id,
      },
    })
  }
}
