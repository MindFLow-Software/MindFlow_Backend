import { Controller, Get, Query } from '@nestjs/common';
import { GetPatientByIdUseCase } from '@/core/domain/application/use-cases/get-patient-by-id';

@Controller('patients')
export class GetPatientByIdController {
    constructor(private readonly getPatientByIdUseCase: GetPatientByIdUseCase) {}

    @Get('by-email')
    async getById(@Query('id') id: string) {
        const result = await this.getPatientByIdUseCase.execute({ id });
        return result;
    }
}
