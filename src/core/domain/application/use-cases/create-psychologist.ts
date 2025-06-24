import { Injectable } from '@nestjs/common'

import {
  Expertise,
  Psychologist,
  PsychologistRole,
} from '@/core/domain/enterprise/entities/psychologist'
import { Gender } from '@/_types/enum-gender'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IcreatePsychologistRequest = {
  firstName: string
  lastName: string
  phoneNumber: string
  isActive?: boolean
  dateOfBrith: Date
  cpf: string
  role: PsychologistRole
  gender: Gender
  expertise: Expertise
  email?: string
  password?: string
  profileImageUrl?: string
  crp?: string
}

@Injectable()
export class CreatePsychologistUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute(data: IcreatePsychologistRequest) {
    const psychologist = Psychologist.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isActive: data.isActive,
      profileImageUrl: data.profileImageUrl,
      crp: data.crp,
      dateOfBrith: data.dateOfBrith,
      cpf: data.cpf,
      role: data.role,
      gender: data.gender,
      expertise: data.expertise,
    })

    await this.psychologistRepository.create(psychologist)
  }
}
