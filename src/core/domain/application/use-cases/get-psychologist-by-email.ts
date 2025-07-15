import { Injectable } from '@nestjs/common'
import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IgetPsychologistByEmailRequest = {
  email: string
}

type IgetPsychologistByEmailResponse = {
  psychologist: Psychologist | null
}

@Injectable()
export class GetPsychologistByEmailUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    email,
  }: IgetPsychologistByEmailRequest): Promise<IgetPsychologistByEmailResponse> {
    const psychologist = await this.psychologistRepository.findByEmail(email)

    return {
      psychologist,
    }
  }
}
