import { Psychologist } from '../../enterprise/entities/psychologist'

type IfindMany = {
  pageIndex: number
  perPage: number
}

export abstract class PsychologistRepository {
  abstract create(psychologist: Psychologist): Promise<void>
  abstract save(psychologist: Psychologist): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Psychologist | null>
  abstract findByEmail(email: string): Promise<Psychologist | null>
  abstract findByCpf(cpf: string): Promise<Psychologist | null>
  abstract findByCrp(crp: string): Promise<Psychologist | null>
  abstract findMany({ pageIndex, perPage }: IfindMany): Promise<Psychologist[]>
}
