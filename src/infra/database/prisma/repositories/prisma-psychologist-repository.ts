import { Injectable } from '@nestjs/common'

import { Expertise, Gender, Psychologist, PsychologistRole } from '@/core/domain/main/enterprise/entities/psychologist'
import { PsychologistRepository } from '@/core/domain/main/application/repositories/psychologist-repository'
import { PrismaService } from '../prisma.service'

type IfindMany = {
  pageIndex: number
  perPage: number
}

@Injectable()
export class PrismaPsychologistRepository implements PsychologistRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(psychologist: Psychologist) {
    await this.prisma.user.create({
      data: psychologist,
    })
  }

  // async createFromLinkedIn(arg0: { email: string; name: string; avatar: string | undefined }) {}

  async save(psychologist: Psychologist) {
    await this.prisma.user.update({
      where: {
        id: psychologist.id,
      },
      data: psychologist,
    })
  }

  async findById(id: string) {
    const psychologist = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!psychologist) return null

    return Psychologist.create({
      ...psychologist,
      role: PsychologistRole[psychologist.role],
      gender: Gender[psychologist.gender],
      expertise: psychologist.expertise ? Expertise[psychologist.expertise] : Expertise.CLINICAL,
    })
  }

  async findByEmail(email: string) {
    const psychologist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!psychologist) return null

    return Psychologist.create({
      ...psychologist,
      role: PsychologistRole[psychologist.role],
      gender: Gender[psychologist.gender],
      expertise: psychologist.expertise ? Expertise[psychologist.expertise] : Expertise.CLINICAL,
    })
  }

  async findByCpf(cpf: string) {
    const psychologist = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!psychologist) return null

    return Psychologist.create({
      ...psychologist,
      role: PsychologistRole[psychologist.role],
      gender: Gender[psychologist.gender],
      expertise: psychologist.expertise ? Expertise[psychologist.expertise] : Expertise.CLINICAL,
    })
  }

  async findByCrp(crp: string) {
    const psychologist = await this.prisma.user.findUnique({
      where: {
        crp,
      },
    })

    if (!psychologist) return null

    return Psychologist.create({
      ...psychologist,
      role: PsychologistRole[psychologist.role],
      gender: Gender[psychologist.gender],
      expertise: psychologist.expertise ? Expertise[psychologist.expertise] : Expertise.CLINICAL,
    })
  }

  async findMany({ pageIndex, perPage }: IfindMany) {
    const psychologists = await this.prisma.user.findMany()

    return psychologists.map((psychologist) => 
      Psychologist.create({
        ...psychologist,
        role: PsychologistRole[psychologist.role],
        gender: Gender[psychologist.gender],
        expertise: psychologist.expertise ? Expertise[psychologist.expertise] : Expertise.CLINICAL,
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