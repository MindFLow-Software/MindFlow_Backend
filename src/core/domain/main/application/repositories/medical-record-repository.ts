import { MedicalRecordAttachment } from '../../enterprise/entities/medical-record-attachment'

export abstract class MedicalRecordRepository {
  abstract createMany(attachments: MedicalRecordAttachment[]): Promise<void>
  abstract update(attachments: MedicalRecordAttachment[]): Promise<void>
  abstract deleteMany(attachmentIds: string[]): Promise<void>
}