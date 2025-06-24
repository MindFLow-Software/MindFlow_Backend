import { Body, Controller, Post } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { CreatePatientUseCase } from '@/core/domain/application/use-cases/create-patient'
import { Gender } from '@/_types/enum-gender'
import { PatientRole } from '@/core/domain/enterprise/entities/patient'

const createPatientBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string(),
  profileImageUrl: z.string().optional(),
  dateOfBrith: z.date(),
  cpf: z.string(),
  role: z.nativeEnum(PatientRole),
  gender: z.nativeEnum(Gender),
})

const createPatientValidationPipe = new ZodValidationPipe(
  createPatientBodySchema,
)

type IcreatePatient = z.infer<typeof createPatientBodySchema>

@Controller('/patient')
export class CreatePatientController {
  constructor(private createPatient: CreatePatientUseCase) {}

  @Post()
  async handle(@Body(createPatientValidationPipe) body: IcreatePatient) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profileImageUrl,
      dateOfBrith,
      cpf,
      role,
      gender,
    } = body

    this.createPatient.execute({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profileImageUrl,
      dateOfBrith,
      cpf,
      role,
      gender,
    })
  }
}
