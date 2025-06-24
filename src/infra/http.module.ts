import { Module } from '@nestjs/common'

import { AuthModule } from 'src/infra/auth/auth.module'
import { DatabaseModule } from './database/prisma/database.module'

import { CreatePsychologistController } from '@/infra/http/controllers/create-psychologist.controller'

import { CreatePatientController } from './http/controllers/create-patient.controller'
import { CreatePsychologistUseCase } from '@/core/domain/application/use-cases/create-psychologist'
import { GetPsychologistByIdController } from './http/controllers/get-psychologist-by-id.controller'

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [
    CreatePsychologistController,
    CreatePatientController,
    GetPsychologistByIdController,
  ],
  providers: [CreatePsychologistUseCase],
})
export class HttpModule {}
