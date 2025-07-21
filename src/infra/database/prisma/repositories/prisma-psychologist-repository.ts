import { Injectable } from '@nestjs/common'

import { Psychologist } from '@/core/domain/main/enterprise/entities/psychologist'
import { PsychologistRepository } from '@/core/domain/main/application/repositories/psychologist-repository'

type IfindMany = {
  pageIndex: number
  perPage: number
}

@Injectable()
export class PrismaPsychologistRepository implements PsychologistRepository {
  constructor() {}

  async create(psychologist: Psychologist) {}

  async createFromLinkedIn(arg0: { email: string; name: string; avatar: string | undefined }) {}

  async save(psychologist: Psychologist) {}

  async findById(id: string) {}

  async findByEmail(email: string) {}

  async findByCpf(cpf: string) {}

  async findByCrp(crp: string) {}

  async findMany({ pageIndex, perPage }: IfindMany) {}

  async delete(id: string) {}
}