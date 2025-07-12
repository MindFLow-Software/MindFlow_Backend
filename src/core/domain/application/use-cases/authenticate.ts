import { compare } from 'bcryptjs'

import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IauthenticateRequest = {
  email: string
  password: string
}

type IauthenticateRsponse = {
  psychologist: Psychologist | null
}

export class AuthenticateUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    email,
    password,
  }: IauthenticateRequest): Promise<IauthenticateRsponse> {
    const psychologist = await this.psychologistRepository.findByEmail(email)

    if (!psychologist) return { psychologist: null }

    const isPasswordMatch = await compare(
      password,
      String(psychologist.password),
    )

    if (!isPasswordMatch) return { psychologist: null }

    return {
      psychologist,
    }
  }
}
