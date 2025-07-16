import { Injectable } from '@nestjs/common'
import { Patient } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'

type IgetPatientByEmailRequest = {
  email: string
}

type IgetPatientByEmailResponse = {
  patient: Patient | null
}

@Injectable()
export class GetPatientByEmailUseCase {
  constructor(private patientRepository: PatientRepository) { }

  async execute({
    email,
  }: IgetPatientByEmailRequest): Promise<IgetPatientByEmailResponse> {
    const patient = await this.patientRepository.findByEmail(email)

    return {
      patient,
    }
  }
}
