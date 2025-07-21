import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { Appointment } from '@/core/domain/main/enterprise/entities/appointment'
import { AppointmentRepository } from '@/core/domain/main/application/repositories/appointment-repository'

type IfindMany = {
  pageIndex: number
  perPage: number
  orderBy: 'asc' | 'desc'
}

type IfindManyByPsychologist = IfindMany & { psychologistId: string }

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(appointment: Appointment) {}

  async save(appointment: Appointment) {}

  async findById(id: string) {}

  async findMany({ pageIndex, perPage, orderBy, }: IfindMany) {}

  async findManyByPsychologist({ pageIndex, perPage, orderBy, psychologistId, }: IfindManyByPsychologist) {}

  async delete(id: string) {}
}
