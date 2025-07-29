import { Module } from '@nestjs/common'

//  Modules
import { CacheModule } from '../cache/cache.module'

//  Services
import { PrismaService } from './prisma/prisma.service'

//  Repositories absctract classes
import { PaymentRepository } from '@/core/domain/main/application/repositories/payment-repository'
import { PatientRepository } from '@/core/domain/main/application/repositories/patient-repository'
import { AttachmentRepository } from '@/core/domain/main/application/repositories/attachment-repository'
import { AppointmentRepository } from '@/core/domain/main/application/repositories/appointment-repository'
import { PsychologistRepository } from '@/core/domain/main/application/repositories/psychologist-repository'
import { MedicalRecordRepository } from '@/core/domain/main/application/repositories/medical-record-repository'
import { SubscriptionPlanRepository } from '@/core/domain/main/application/repositories/subscription-plan-repository'

//  Prisma repositories classes
import { PrismaPaymentRepository } from './prisma/repositories/prisma-payment-repository'
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository'
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachment-repository'
import { PrismaAppointmentRepository } from './prisma/repositories/prisma-appointment-repository'
import { PrismaPsychologistRepository } from './prisma/repositories/prisma-psychologist-repository'
import { PrismaMedicalRecordRepository } from './prisma/repositories/prisma-medical-record-repository'
import { PrismaSubscriptionPlanRepository } from './prisma/repositories/prisma-subscription-plan-repository'

@Module({
  imports: [
    CacheModule,
  ],
  providers: [
    PrismaService,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentRepository,
    },
    {
      provide: MedicalRecordRepository,
      useClass: PrismaMedicalRecordRepository,
    },
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: PsychologistRepository,
      useClass: PrismaPsychologistRepository,
    },
    {
      provide: SubscriptionPlanRepository,
      useClass: PrismaSubscriptionPlanRepository,
    },
  ],
  exports: [
    PrismaService,
    PatientRepository,
    PaymentRepository,
    AttachmentRepository,
    AppointmentRepository,
    PsychologistRepository,
    MedicalRecordRepository,
    SubscriptionPlanRepository,
  ],
})
export class DatabaseModule {}
