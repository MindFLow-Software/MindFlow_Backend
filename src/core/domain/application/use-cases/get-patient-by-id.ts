import { Patient } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'

type IgetPatientByIdUseCaseRequest = {
  id: string
}

type IgetPatientByIdUseCaseResponse = {
  patient: Patient | null
}

export class GetPatientByIdUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({
    id,
  }: IgetPatientByIdUseCaseRequest): Promise<IgetPatientByIdUseCaseResponse> {
    const patient = await this.patientRepository.findById(id)

    return { patient }
  }
}
