import { Injectable } from '@nestjs/common'
import { Patient } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'

type IgetPatientByCpfRequest = {
  cpf: string
}

type IgetPatientByCpfResponse = {
  patient: Patient | null
}

@Injectable()
export class GetPatientByCpfUseCase {
  constructor(private patientRepository: PatientRepository) { }

  async execute({
    cpf,
  }: IgetPatientByCpfRequest): Promise<IgetPatientByCpfResponse> {
    const patient = await this.patientRepository.findByCpf(cpf)

    return {
      patient,
    }
  }
}
