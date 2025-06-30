import { Patient } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'

type IfetchPatientsRequest = {
  pageIndex: number
  perPage: number
}

type IfetchPatientsResponse = {
  patients: Patient[]
}

export class FetchPatientsUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({
    pageIndex,
    perPage,
  }: IfetchPatientsRequest): Promise<IfetchPatientsResponse> {
    const patients = await this.patientRepository.findMany({
      pageIndex,
      perPage,
    })

    return {
      patients,
    }
  }
}
