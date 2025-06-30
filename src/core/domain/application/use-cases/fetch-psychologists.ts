import { Psychologist } from '../../enterprise/entities/psychologist'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IfetchPsychologistRequest = {
  pageIndex: number
  perPage: number
}

type IfetchPsychologistResponse = {
  psychologists: Psychologist[]
}

export class FetchPsychologistUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({
    pageIndex,
    perPage,
  }: IfetchPsychologistRequest): Promise<IfetchPsychologistResponse> {
    const psychologists = await this.psychologistRepository.findMany({
      pageIndex,
      perPage,
    })

    return {
      psychologists,
    }
  }
}
