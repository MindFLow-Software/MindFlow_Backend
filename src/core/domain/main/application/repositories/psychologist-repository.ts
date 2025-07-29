import { Psychologist } from '../../enterprise/entities/psychologist'

type IfindMany = {
  pageIndex: number
  perPage: number
}

export abstract class PsychologistRepository {
  // createFromLinkedIn(arg0: { email: string; name: string; avatar: string | undefined }): Psychologist | PromiseLike<Psychologist | null> | null {
  //   throw new Error('Method not implemented.')
  // }
  abstract create(psychologist: Psychologist): Promise<void>
  abstract save(psychologist: Psychologist): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Psychologist | null>
  abstract findByEmail(email: string): Promise<Psychologist | null>
  abstract findByCpf(cpf: string): Promise<Psychologist | null>
  abstract findByCrp(crp: string): Promise<Psychologist | null>
  abstract findMany({ pageIndex, perPage }: IfindMany): Promise<Psychologist[]>
}
