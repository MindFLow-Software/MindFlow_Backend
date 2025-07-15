import { Controller, Get, Query } from '@nestjs/common';
import { GetPsychologistByCpfUseCase } from '@/core/domain/application/use-cases/get-psychologist-by-cpf';

@Controller('psychologist')
export class GetPatientByCpfController {
    constructor(private readonly getPatientByCpfUseCase: GetPsychologistByCpfUseCase) {}

    @Get('by-cpf')
    async getByCpf(@Query('cpf') cpf: string) {
        const result = await this.getPatientByCpfUseCase.execute({ cpf });
        return result;
    }
}
