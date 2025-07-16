import { PatientRepository } from '@/core/domain/main/application/repositories/patient-repository'
import { Patient } from '@/core/domain/main/enterprise/entities/patient'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryPatientRespository implements PatientRepository {
  public patients: Patient[] = []

  constructor() { }

  async create(patient: Patient): Promise<void> {
    this.patients.push(patient)
  }

  async save(patient: Patient): Promise<void> {
    const patientToUpdateIndex = this.patients.findIndex(
      ({ id }) => id === patient.id,
    )

    this.patients[patientToUpdateIndex] = patient
  }

  async delete(id: string): Promise<void> {
    this.patients = this.patients.filter((patient) => patient.id !== id)
  }

  async findByCpf(cpf: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.cpf === cpf) || null
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.email === email) || null
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.id === id) || null
  }

  async findMany({
    pageIndex,
    perPage,
  }: {
    pageIndex: number
    perPage: number
  }): Promise<Patient[]> {
    return this.patients.slice(pageIndex * perPage, (pageIndex + 1) * perPage)
  }
}
