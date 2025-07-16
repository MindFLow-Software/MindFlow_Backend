import { Injectable } from '@nestjs/common'
import { PatientRepository } from '../repositories/patient-repository'

type IdeletePatientRequest = {
  patientId: string
}

@Injectable()
export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ patientId }: IdeletePatientRequest): Promise<void> {
    await this.patientRepository.delete(patientId)
  }
}
