import { Injectable } from '@nestjs/common'

import { Gender, Patient, PatientRole } from '@/core/domain/main/enterprise/entities/patient'
import { PatientRepository } from '@/core/domain/main/application/repositories/patient-repository'
import { PrismaService } from '../prisma.service'

type Ifindmany = {
  pageIndex: number
  perPage: number
}

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(patient: Patient) {
    await this.prisma.user.create({
      data: patient, 
    })
  }

  async save(patient: Patient) {
    await this.prisma.user.update({
      where: {
        id: patient.id,
      },
      data: patient,
    })
  }

  async findById(id: string) {
    const patient = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!patient) return null

    return Patient.create({
      ...patient,
      role: PatientRole[patient.role],
      gender: Gender[patient.gender],
    })
  }

  async findByEmail(email: string) {
    const patient = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!patient) return null

    return Patient.create({
      ...patient,
      role: PatientRole[patient.role],
      gender: Gender[patient.gender],
    })
  }

  async findByCpf(cpf: string) {
    const patient = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!patient) return null

    return Patient.create({
      ...patient,
      role: PatientRole[patient.role],
      gender: Gender[patient.gender],
    })
  }

  async findMany({ pageIndex, perPage }: Ifindmany) {
    const patients = await this.prisma.user.findMany({
      take: perPage,
      skip: pageIndex * perPage,
    })

    return patients.map((patient) => 
      Patient.create({
      ...patient,
      role: PatientRole[patient.role],
      gender: Gender[patient.gender],
    })
    )
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
