import { Injectable } from '@nestjs/common'
import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IgetPsychologistByCrpRequest = {
  crp: string
}

type IgetPsychologistByCrpResponse = {
  psychologist: Psychologist | null
}

@Injectable()
export class GetPsychologistByCrpUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    crp,
  }: IgetPsychologistByCrpRequest): Promise<IgetPsychologistByCrpResponse> {
    const psychologist = await this.psychologistRepository.findByCrp(crp)

    return {
      psychologist,
    }
  }
}
