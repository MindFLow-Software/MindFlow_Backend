import { PsychologistRepository } from '@/core/domain/main/application/repositories/psychologist-repository'
import { Psychologist } from '@/core/domain/main/enterprise/entities/psychologist'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryPsychologistRespository implements PsychologistRepository {
  public psychologists: Psychologist[] = []

  constructor() { }
  createFromLinkedIn(arg0: { email: string; name: string; avatar: string | undefined }): Psychologist | PromiseLike<Psychologist | null> | null {
    throw new Error('Method not implemented.')
  }

  async create(psychologist: Psychologist): Promise<void> {
    this.psychologists.push(psychologist)
  }

  async save(psychologist: Psychologist): Promise<void> {
    const psychologistToUpdateIndex = this.psychologists.findIndex(
      ({ id }) => id === psychologist.id,
    )

    this.psychologists[psychologistToUpdateIndex] = psychologist
  }

  async delete(id: string): Promise<void> {
    this.psychologists = this.psychologists.filter(
      (psychologist) => psychologist.id !== id,
    )
  }

  async findById(id: string): Promise<Psychologist | null> {
    return (
      this.psychologists.find((psychologist) => psychologist.id === id) || null
    )
  }

  async findByCpf(cpf: string): Promise<Psychologist | null> {
    return (
      this.psychologists.find((psychologist) => psychologist.cpf === cpf) ||
      null
    )
  }

  async findByCrp(crp: string): Promise<Psychologist | null> {
    return (
      this.psychologists.find((psychologist) => psychologist.crp === crp) ||
      null
    )
  }

  async findByEmail(email: string): Promise<Psychologist | null> {
    return (
      this.psychologists.find((psychologist) => psychologist.email === email) ||
      null
    )
  }

  async findMany({
    pageIndex,
    perPage,
  }: {
    pageIndex: number
    perPage: number
  }): Promise<Psychologist[]> {
    return this.psychologists.slice(
      pageIndex * perPage,
      (pageIndex + 1) * perPage,
    )
  }
}
