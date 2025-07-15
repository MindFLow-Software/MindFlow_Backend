import { Controller, Get, Query } from '@nestjs/common';
import { GetPatientByEmailUseCase } from '@/core/domain/application/use-cases/get-patient-by-email';

@Controller('patients')
export class GetPatientByEmailController {
    constructor(private readonly getPatientByEmailUseCase: GetPatientByEmailUseCase) {}

    @Get('by-email')
    async getByEmail(@Query('email') email: string) {
        const result = await this.getPatientByEmailUseCase.execute({ email });
        return result;
    }
}
