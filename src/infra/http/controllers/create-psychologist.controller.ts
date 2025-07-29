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

import {
  Expertise,
  PsychologistRole,
} from '@/core/domain/main/enterprise/entities/psychologist'
import { Gender } from '@/_types/enum-gender'
import { CreatePsychologistUseCase } from '@/core/domain/main/application/use-cases/create-psychologist'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

const createPsychologistBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string(),
  isActive: z.boolean().optional().default(false),
  profileImageUrl: z.string().optional(),
  crp: z.string().optional(),
  dateOfBrith: z.coerce.date(),
  cpf: z.string(),
  role: z.enum(PsychologistRole),
  gender: z.enum(Gender),
  expertise: z.enum(Expertise),
})

const createUserValidationPipe = new ZodValidationPipe(
  createPsychologistBodySchema,
)

type IcreatePsychologist = z.infer<typeof createPsychologistBodySchema>

@Controller('/psychologist')
export class CreatePsychologistController {
  constructor(
    private createPsychologist: CreatePsychologistUseCase,
    private prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(createUserValidationPipe) body: IcreatePsychologist) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      isActive,
      profileImageUrl,
      crp,
      dateOfBrith,
      cpf,
      role,
      gender,
      expertise,
    } = body

    const psychologistWithSameEmail =
      await this.prisma.user.findUnique({
        where: {
          email,
          role: 'PSYCHOLOGIST',
        },
      })

    if (psychologistWithSameEmail) {
      throw new ConflictException('Psychologist with this email already exists')
    }

    const hashedPassword = password ? await hash(password, 10) : undefined

    this.createPsychologist.execute({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      isActive,
      profileImageUrl,
      crp,
      dateOfBrith,
      cpf,
      role,
      gender,
      expertise,
    })
  }
}
