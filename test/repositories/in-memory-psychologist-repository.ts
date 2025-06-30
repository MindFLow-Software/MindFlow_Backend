import { PsychologistRepository } from '@/core/domain/application/repositories/psychologist-repository'
import { Psychologist } from '@/core/domain/enterprise/entities/psychologist'

export class InMemoryPsychologistRespository implements PsychologistRepository {
  public psychologists: Psychologist[] = []

  constructor() {}

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
