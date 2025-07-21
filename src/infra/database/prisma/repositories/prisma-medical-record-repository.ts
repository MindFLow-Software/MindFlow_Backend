import { Injectable } from '@nestjs/common'

import { MedicalRecordRepository } from '@/core/domain/main/application/repositories/medical-record-repository'
import { MedicalRecordAttachment } from '@/core/domain/main/enterprise/entities/medical-record-attachment'

@Injectable()
export class PrismaMedicalRecordRepository implements MedicalRecordRepository {
  constructor() {}

  async createMany(attachments: MedicalRecordAttachment[]) {}

  async update(attachments: MedicalRecordAttachment[]) {}

  async deleteMany(attachmentIds: string[]) {}
}
