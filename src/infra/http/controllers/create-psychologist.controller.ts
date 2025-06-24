import { Body, Controller, Post } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { CreatePsychologistUseCase } from '@/core/domain/application/use-cases/create-psychologist'

import {
  Expertise,
  PsychologistRole,
} from '@/core/domain/enterprise/entities/psychologist'
import { Gender } from '@/_types/enum-gender'

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

    this.createPsychologist.execute({
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
    })
  }
}
