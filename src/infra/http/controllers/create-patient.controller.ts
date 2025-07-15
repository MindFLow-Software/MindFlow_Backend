import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'

import { z } from 'zod'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { Gender } from '@/_types/enum-gender'
import { PatientRole } from '@/core/domain/enterprise/entities/patient'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { CreatePatientUseCase } from '@/core/domain/application/use-cases/create-patient'

const createPatientBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string(),
  profileImageUrl: z.string().optional(),
  dateOfBrith: z.date(),
  cpf: z.string(),
  role: z.enum(PatientRole),
  gender: z.enum(Gender),
})

const createPatientValidationPipe = new ZodValidationPipe(
  createPatientBodySchema,
)

type IcreatePatient = z.infer<typeof createPatientBodySchema>

@Controller('/patient')
export class CreatePatientController {
  constructor(private createPatient: CreatePatientUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPatientBodySchema))
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

    const patienttWithSameEmail =
      await PrismaService.instance.patientt.findUnique({
        where: { email },
      })

    if (patienttWithSameEmail) {
      throw new ConflictException('patientt with this email already exists')
    }

    const hashedPassword = password ? await hash(password, 10) : undefined

    this.createPatient.execute({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImageUrl,
      dateOfBrith,
      cpf,
      role,
      gender,
    })
  }
}
