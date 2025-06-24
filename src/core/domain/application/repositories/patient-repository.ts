import { Patient } from '../../enterprise/entities/patient'

type IfindMany = {
  pageIndex: number
  perPage: number
}

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<void>
  abstract save(patient: Patient): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Patient | null>
  abstract findByEmail(email: string): Promise<Patient | null>
  abstract findByCpf(cpf: string): Promise<Patient | null>
  abstract findMany({ pageIndex, perPage }: IfindMany): Promise<Patient[]>
}
