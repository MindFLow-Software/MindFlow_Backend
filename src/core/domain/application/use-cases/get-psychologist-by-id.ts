import { Injectable } from '@nestjs/common'
import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IgetPsychologistRequest = {
  id: string
}

type IgetPsychologistResponse = {
  psychologist: Psychologist | null
}

@Injectable()
export class GetPsychologistByIdUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    id,
  }: IgetPsychologistRequest): Promise<IgetPsychologistResponse> {
    const psychologist = await this.psychologistRepository.findById(id)

    return {
      psychologist,
    }
  }
}
