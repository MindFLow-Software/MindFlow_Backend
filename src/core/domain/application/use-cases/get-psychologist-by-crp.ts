import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IgetPsychologistByCrpRequest = {
  crp: string
}

type IgetPsychologistByCrpResponse = {
  psychologist: Psychologist | null
}

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
