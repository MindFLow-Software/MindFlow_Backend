import { Controller, Get, Param } from '@nestjs/common'
import { GetAppointmentByIdUseCase } from '@/core/domain/application/use-cases/get-appointment'
import { Appointment } from '@/core/domain/enterprise/entities/appointment'

@Controller('appointments')
export class GetAppointmentController {
    constructor(private readonly getAppointmentByIdUseCase: GetAppointmentByIdUseCase) {}

    @Get(':id')
    async getById(@Param('id') id: string): Promise<{ appointment: Appointment | null }> {
        const result = await this.getAppointmentByIdUseCase.execute({ id })
        return { appointment: result.appointment }
    }
}