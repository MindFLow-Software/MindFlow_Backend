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
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { Gender } from '@/_types/enum-gender'
import { PatientRole } from '@/core/domain/main/enterprise/entities/patient'
import { CreatePatientUseCase } from '@/core/domain/main/application/use-cases/create-patient'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

const createPatientBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string(),
  profileImageUrl: z.string().optional(),
  dateOfBirth: z.coerce.date(),
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
  constructor(
    private createPatient: CreatePatientUseCase,
    private prisma: PrismaService,
  ) { }

  @Post()
  @HttpCode(201)
  async handle(@Body(createPatientValidationPipe) body: IcreatePatient) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profileImageUrl,
      dateOfBirth,
      cpf,
      role,
      gender,
    } = body

    console.log('data: ', body)

    const patienttWithSameEmail =
      await this.prisma.user.findUnique({
        where: {
          email,
          role: 'PATIENT',
        },
      })

    if (patienttWithSameEmail) {
      throw new ConflictException('patient with this email already exists')
    }

    const hashedPassword = password ? await hash(password, 10) : undefined

    this.createPatient.execute({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImageUrl,
      dateOfBirth,
      cpf,
      role,
      gender,
    })
  }
}
