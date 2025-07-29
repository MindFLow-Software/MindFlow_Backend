import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { Appointment, AppointmentStatus } from '@/core/domain/main/enterprise/entities/appointment'
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

  async create(appointment: Appointment) {
    await this.prisma.appointment.create({
      data: appointment,
    })
  }

  async save(appointment: Appointment) {
    await this.prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        diagnosis: appointment.diagnosis,
        durationInMin: appointment.durationInMin,
        endedAt: appointment.endedAt,
        notes: appointment.notes,
        patientId: appointment.patientId,
        psychologistId: appointment.psychologistId,
        scheduledAt: appointment.scheduledAt,
        startedAt: appointment.startedAt,
        status: appointment.status,
      }
    })
  }

  async findById(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
    })

    if (!appointment) return null

    return Appointment.create({...appointment, status: AppointmentStatus[appointment.status]})
  }

  async findMany({ pageIndex, perPage, orderBy, }: IfindMany) {
    const appointments = await this.prisma.appointment.findMany({
      take: perPage,
      skip: pageIndex * perPage,
    })

    return appointments.map((appointment) => Appointment.create({ ...appointment, status: AppointmentStatus[appointment.status] }))
  }

  async findManyByPsychologist({ pageIndex, perPage, orderBy, psychologistId, }: IfindManyByPsychologist) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        psychologistId,
      },
      take: perPage,
      skip: pageIndex * perPage,
    })

    return appointments.map((appointment) => Appointment.create({ ...appointment, status: AppointmentStatus[appointment.status] }))
  }

  async delete(id: string) {
    await this.prisma.appointment.delete({
      where: {
        id,
      },
    })
  }
}
