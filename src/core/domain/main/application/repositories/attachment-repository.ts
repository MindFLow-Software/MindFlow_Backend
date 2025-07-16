import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentRepository {
  abstract create(attachment: Attachment): Promise<void>
  abstract createMany(attachments: Attachment[]): Promise<void>
}
