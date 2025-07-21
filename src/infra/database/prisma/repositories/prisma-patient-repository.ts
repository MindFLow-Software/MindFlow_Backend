import { Injectable } from '@nestjs/common'

import { Patient } from '@/core/domain/main/enterprise/entities/patient'
import { PatientRepository } from '@/core/domain/main/application/repositories/patient-repository'

type Ifindmany = {
  pageIndex: number
  perPage: number
}

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor() {}

  async create(patient: Patient) {}

  async save(patient: Patient) {}

  async findById(id: string) {}

  async findByEmail(email: string) {}

  async findByCpf(cpf: string) {}

  async findMany({ pageIndex, perPage }: Ifindmany) {}

  async delete(id: string) {}
}
