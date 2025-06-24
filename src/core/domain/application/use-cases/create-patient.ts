import { Patient, PatientRole } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'

import { Gender } from '@/_types/enum-gender'

type IcreatePatientRequest = {
  firstName: string
  lastName: string
  phoneNumber: string
  isActive?: boolean
  dateOfBrith: Date
  cpf: string
  role: PatientRole
  gender: Gender
  email?: string
  password?: string
  profileImageUrl?: string
}

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(data: IcreatePatientRequest) {
    const patient = Patient.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      profileImageUrl: data.profileImageUrl,
      dateOfBrith: data.dateOfBrith,
      cpf: data.cpf,
      role: data.role,
      gender: data.gender,
    })

    await this.patientRepository.create(patient)
  }
}
