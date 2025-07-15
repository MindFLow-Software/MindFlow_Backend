import { CreateAppointmentUseCase } from '@/core/domain/application/use-cases/create-appointment'
import { AppointmentStatus } from '@/core/domain/enterprise/entities/appointment'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import z from 'zod'

const createAppointmentBodySchema = z.object({
  patientId: z.string(),
  psychologistId: z.string(),
  diagnosis: z.string(),
  notes: z.string().optional(),
  scheduledAt: z.date(),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
  status: z.enum(AppointmentStatus),
})

type IcreateAppointmentBody = z.infer<typeof createAppointmentBodySchema>

const createAppointmentValidationPipe = new ZodValidationPipe(createAppointmentBodySchema)

@Controller('/appointment')
export class CreateAppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(createAppointmentValidationPipe) body: IcreateAppointmentBody) {
    const {
      psychologistId,
      patientId,
      diagnosis,
      notes,
      status,
      scheduledAt,
      startedAt,
      endedAt,
    } = body

    await this.createAppointmentUseCase.execute({
      psychologistId,
      patientId,
      diagnosis,
      notes,
      status,
      scheduledAt,
      startedAt,
      endedAt,
    })
  }
}