import { MedicalRecordRepository } from '@/core/domain/main/application/repositories/medical-record-repository'
import { MedicalRecordAttachment } from '@/core/domain/main/enterprise/entities/medical-record-attachment'

export class InMemoryMedicalRecordRepository implements MedicalRecordRepository {
  public medicalRecords: MedicalRecordAttachment[] = []

  async createMany(medicalRecordAttachments: MedicalRecordAttachment[]) {
    this.medicalRecords.push(...medicalRecordAttachments)
  }

  async update(medicalRecordAttachments: MedicalRecordAttachment[]) {

  }

  async deleteMany(attachmentIds: string[]) {}
}
