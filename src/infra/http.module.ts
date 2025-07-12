import { Module } from '@nestjs/common'

// modules
import { AuthModule } from 'src/infra/auth/auth.module'

// controllers
import { AuthenticateController } from './http/controllers/authenticate.controller'
import { CreatePatientController } from './http/controllers/create-patient.controller'
import { CreatePsychologistController } from '@/infra/http/controllers/create-psychologist.controller'
import { GetPsychologistByIdController } from './http/controllers/get-psychologist-by-id.controller'

// use-cases
import { AuthenticateUseCase } from '@/core/domain/application/use-cases/authenticate'
import { CreatePatientUseCase } from '@/core/domain/application/use-cases/create-patient'
import { CreatePsychologistUseCase } from '@/core/domain/application/use-cases/create-psychologist'
import { GetPsychologistByIdUseCase } from '@/core/domain/application/use-cases/get-psychologist-by-id'

@Module({
  imports: [AuthModule],
  controllers: [
    AuthenticateController,
    CreatePatientController,
    CreatePsychologistController,
    GetPsychologistByIdController,
  ],
  providers: [
    AuthenticateUseCase,
    CreatePatientUseCase,
    CreatePsychologistUseCase,
    GetPsychologistByIdUseCase,
  ],
})
export class HttpModule {}
