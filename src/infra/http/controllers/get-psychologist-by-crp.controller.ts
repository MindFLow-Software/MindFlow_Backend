import { Controller, Get, Query } from '@nestjs/common';
import { GetPsychologistByCrpUseCase } from '@/core/domain/application/use-cases/get-psychologist-by-crp';

@Controller('psychologist')
export class GetPatientByCrpController {
    GetPsychologistByCrpUseCase: any;
    constructor(private readonly getPatientByCrpUseCase: GetPsychologistByCrpUseCase) {}

    @Get('by-crp')
    async getByCpf(@Query('crp') crp: string) {
        const result = await this.GetPsychologistByCrpUseCase.execute({ crp });
        return result;
    }
}
