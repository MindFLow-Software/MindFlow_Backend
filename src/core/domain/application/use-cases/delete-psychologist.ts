import { PsychologistRepository } from '../repositories/psychologist-repository'

type IdeletePsychologistRequest = {
  id: string
}

export class DeletePsychologistUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({ id }: IdeletePsychologistRequest): Promise<void> {
    await this.psychologistRepository.delete(id)
  }
}
