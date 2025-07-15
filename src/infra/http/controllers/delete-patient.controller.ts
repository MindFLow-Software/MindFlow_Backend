import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import z from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

import { DeletePatientUseCase } from '@/core/domain/application/use-cases/delete-patient'

const deletePatientParamsSchema = z.object({
  patientId: z.string(),
})

type IdeletePatientParams = z.infer<typeof deletePatientParamsSchema>

const deletePatientParamValidationPipe = new ZodValidationPipe(deletePatientParamsSchema)

@Controller('/patient')
export class DeletePatientController {
  constructor(
    private deletePatientUseCase: DeletePatientUseCase
  ) {}

  @Delete(':patientId')
  @HttpCode(204)
  async execute(@Param(deletePatientParamValidationPipe) params: IdeletePatientParams) {
    const { patientId } = params

    await this.deletePatientUseCase.execute({ patientId })
  }
}