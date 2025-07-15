import { Controller, Get, Query } from '@nestjs/common';
import { GetPsychologistByEmailUseCase } from '@/core/domain/application/use-cases/get-psychologist-by-email';

@Controller('psychologist')
export class GetPatientByEmailController {
    GetPsychologistByEmailUseCase: any;
    constructor(private readonly getPatientByEmailUseCase: GetPsychologistByEmailUseCase) {}

    @Get('by-email')
    async getByEmail(@Query('email') email: string) {
        const result = await this.getPatientByEmailUseCase.execute({ email });
        return result;
    }
}
