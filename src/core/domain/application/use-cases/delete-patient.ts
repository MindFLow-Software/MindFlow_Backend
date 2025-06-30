import { PatientRepository } from '../repositories/patient-repository'

type IdeletePatientRequest = {
  id: string
}

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ id }: IdeletePatientRequest): Promise<void> {
    await this.patientRepository.delete(id)
  }
}
