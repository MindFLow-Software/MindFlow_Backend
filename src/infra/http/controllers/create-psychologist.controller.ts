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

import { PrismaService } from 'src/infra/database/prisma/prisma.service'

import {
  Expertise,
  PsychologistRole,
} from '@/core/domain/enterprise/entities/psychologist'
import { Gender } from '@/_types/enum-gender'
import { CreatePsychologistUseCase } from '@/core/domain/application/use-cases/create-psychologist'

const createPsychologistBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string(),
  isActive: z.boolean().optional().default(false),
  profileImageUrl: z.string().optional(),
  crp: z.string().optional(),
  dateOfBrith: z.date(),
  cpf: z.string(),
  role: z.nativeEnum(PsychologistRole),
  gender: z.nativeEnum(Gender),
  expertise: z.nativeEnum(Expertise),
})

const createUserValidationPipe = new ZodValidationPipe(
  createPsychologistBodySchema,
)
type IcreatePsychologist = z.infer<typeof createPsychologistBodySchema>

@Controller('/psychologist')
export class CreatePsychologistController {
  constructor(private createPsychologist: CreatePsychologistUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPsychologistBodySchema))
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
      await PrismaService.instance.psychologist.findUnique({
        where: { email },
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
