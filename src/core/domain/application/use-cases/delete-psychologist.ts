import { Injectable } from '@nestjs/common'
import { PsychologistRepository } from '../repositories/psychologist-repository'

type IdeletePsychologistRequest = {
  psychologistId: string
}

@Injectable()
export class DeletePsychologistUseCase {
  constructor(private psychologistRepository: PsychologistRepository) {}

  async execute({ psychologistId }: IdeletePsychologistRequest): Promise<void> {
    await this.psychologistRepository.delete(psychologistId)
  }
}
