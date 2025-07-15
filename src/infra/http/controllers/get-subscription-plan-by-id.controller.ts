import { Controller, Get, Param } from '@nestjs/common'
import { GetSubscriptionPlanByIdUseCase } from '@/core/domain/application/use-cases/get-subscription-plan-by-id'

@Controller('subscription-plans')
export class SubscriptionPlanController {
    constructor(private readonly getSubscriptionPlanByIdUseCase: GetSubscriptionPlanByIdUseCase) {}

    @Get(':id')
    async getById(@Param('id') id: string) {
        const result = await this.getSubscriptionPlanByIdUseCase.execute({ id })
        return result.subscriptionPlan
    }
}
