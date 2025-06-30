import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IGetPsychologistByCpfRequest = {
  cpf: string
}

type IGetPsychologistByCpfResponse = {
  psychologist: Psychologist | null
}

export class GetPsychologistByCpfUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    cpf,
  }: IGetPsychologistByCpfRequest): Promise<IGetPsychologistByCpfResponse> {
    const psychologist = await this.psychologistRepository.findByCpf(cpf)

    return {
      psychologist,
    }
  }
}
