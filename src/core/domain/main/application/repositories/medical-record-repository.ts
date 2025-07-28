import { MedicalRecordAttachment } from '../../enterprise/entities/medical-record-attachment'

export abstract class MedicalRecordRepository {
  abstract create(attachment: MedicalRecordAttachment): Promise<void>
  abstract createMany(attachments: MedicalRecordAttachment[]): Promise<void>
  abstract deleteMany(attachmentIds: string[]): Promise<void>
}