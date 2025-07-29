import { Module } from '@nestjs/common'

// modules
import { AuthModule } from 'src/infra/auth/auth.module'
import { DatabaseModule } from '../database/database.module'

// controllers
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreatePatientController } from '@/infra/http/controllers/create-patient.controller'
import { DeletePatientController } from './controllers/delete-patient.controller'
import { FetchPatientsController } from './controllers/fetch-patients.controller'
import { GetPatientByIdController } from './controllers/get-patient-by-id.controller'
import { GetPatientByCpfController } from './controllers/get-patient-by-cpf.controller'
import { GetPatientByEmailController } from './controllers/get-patient-by-email.controller'
import { CreateAppointmentController } from './controllers/create-appointment.controller'
import { FetchAppointmentsController } from './controllers/fetch-appointments.controller'
import { FetchPsychologistController } from './controllers/fetch-psychologists.controller'
import { CreatePsychologistController } from '@/infra/http/controllers/create-psychologist.controller'
import { DeletePsychologistController } from './controllers/delete-psychologist.controller'
import { GetAppointmentByIdController } from './controllers/get-appointment-by-id.controller'
import { GetPsychologistByIdController } from '@/infra/http/controllers/get-psychologist-by-id.controller'
import { GetPsychologistByCpfController } from './controllers/get-psychologist-by-cpf.controller'
import { GetPsychologistByCrpController } from './controllers/get-psychologist-by-crp.controller'
import { FetchSubscriptionPlanController } from './controllers/fetch-subscription-plans.controller'
import { CreateSubscriptionPlanController } from './controllers/create-subscription-plan.controller'
import { DeleteSubscriptionPlanController } from './controllers/delete-subscription-plan.controller'
import { GetSubscriptionPlanByIdController } from './controllers/get-subscription-plan-by-id.controller'
import { FetchAppointmentsByPsychologistIdController } from './controllers/fetch-appointments-by-psychologist-id.controller'

// use-cases
import { AuthenticateUseCase } from '@/core/domain/main/application/use-cases/authenticate'
import { CreatePatientUseCase } from '@/core/domain/main/application/use-cases/create-patient'
import { DeletePatientUseCase } from '@/core/domain/main/application/use-cases/delete-patient'
import { FetchPatientsUseCase } from '@/core/domain/main/application/use-cases/fetch-patients'
import { GetPatientByIdUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-id'
import { GetPatientByCpfUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-cpf'
import { GetPatientByEmailUseCase } from '@/core/domain/main/application/use-cases/get-patient-by-email'
import { CreateAppointmentUseCase } from '@/core/domain/main/application/use-cases/create-appointment'
import { FetchAppointmentsUseCase } from '@/core/domain/main/application/use-cases/fetch-appointments'
import { FetchPsychologistUseCase } from '@/core/domain/main/application/use-cases/fetch-psychologists'
import { CreatePsychologistUseCase } from '@/core/domain/main/application/use-cases/create-psychologist'
import { DeletePsychologistUseCase } from '@/core/domain/main/application/use-cases/delete-psychologist'
import { GetAppointmentByIdUseCase } from '@/core/domain/main/application/use-cases/get-appointment'
import { GetPsychologistByIdUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-id'
import { GetPsychologistByCpfUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-cpf'
import { GetPsychologistByCrpUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-crp'
import { CreateSubscriptionPlanUseCase } from '@/core/domain/main/application/use-cases/create-subscription-plan'
import { DeleteSubscriptionPlanUseCase } from '@/core/domain/main/application/use-cases/delete-subscription-plan'
import { FetchSubscriptionPlansUseCase } from '@/core/domain/main/application/use-cases/fetch-subscription-plans'
import { GetPsychologistByEmailUseCase } from '@/core/domain/main/application/use-cases/get-psychologist-by-email'
import { GetSubscriptionPlanByIdUseCase } from '@/core/domain/main/application/use-cases/get-subscription-plan-by-id'
import { GetPsychologistByEmailController } from './controllers/get-psychologist-by-email.controller'
import { FetchAppointmentsByPsychologistIdUseCase } from '@/core/domain/main/application/use-cases/fetch-appointments-by-psychologist-id'

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
  ],
  controllers: [
    CreateAppointmentController,
    CreatePatientController,
    CreatePsychologistController,
    CreateSubscriptionPlanController,
    DeletePatientController,
    DeletePsychologistController,
    DeleteSubscriptionPlanController,
    FetchAppointmentsByPsychologistIdController,
    FetchAppointmentsController,
    FetchPatientsController,
    FetchPsychologistController,
    FetchSubscriptionPlanController,
    GetAppointmentByIdController,
    GetPatientByCpfController,
    GetPatientByEmailController,
    GetPatientByIdController,
    GetPsychologistByCpfController,
    GetPsychologistByCrpController,
    GetPsychologistByEmailController,
    GetPsychologistByIdController,
    GetSubscriptionPlanByIdController,
  ],
  providers: [
    CreateAppointmentUseCase,
    CreatePatientUseCase,
    CreatePsychologistUseCase,
    CreateSubscriptionPlanUseCase,
    DeletePatientUseCase,
    DeletePsychologistUseCase,
    DeleteSubscriptionPlanUseCase,
    FetchAppointmentsByPsychologistIdUseCase,
    FetchAppointmentsUseCase,
    FetchPatientsUseCase,
    FetchPsychologistUseCase,
    FetchSubscriptionPlansUseCase,
    GetAppointmentByIdUseCase,
    GetPatientByCpfUseCase,
    GetPatientByEmailUseCase,
    GetPatientByIdUseCase,
    GetPsychologistByCpfUseCase,
    GetPsychologistByCrpUseCase,
    GetPsychologistByEmailUseCase,
    GetPsychologistByIdUseCase,
    GetSubscriptionPlanByIdUseCase,
  ],
})
export class HttpModule {}
