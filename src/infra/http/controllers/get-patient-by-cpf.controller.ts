import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import z from 'zod';
import { GetPatientByCpfUseCase } from '@/core/domain/application/use-cases/get-patient-by-cpf';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';

const cpfParamSchema = z.object({
    cpf: z.string().min(11).max(14), 
});

type IGetPatientByCpfParams = z.infer<typeof cpfParamSchema>;

const cpfValidationPipe = new ZodValidationPipe(cpfParamSchema);

@Controller('patients')
export class GetPatientByCpfController {
    constructor(private readonly getPatientByCpfUseCase: GetPatientByCpfUseCase) {}

    @Get('cpf/:cpf')
    @UsePipes(cpfValidationPipe)
    async getByCpf(@Param() params: IGetPatientByCpfParams) {
        const { cpf } = params;
        const result = await this.getPatientByCpfUseCase.execute({ cpf });
        return result;
    }
}
