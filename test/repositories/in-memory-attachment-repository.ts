import { AttachmentRepository } from '@/core/domain/application/repositories/attachment-repository'
import { Attachment } from '@/core/domain/enterprise/entities/attachment'

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public Attachments: Attachment[] = []

  constructor() {}

  async create(attachment: Attachment): Promise<void> {
    this.Attachments.push(attachment)
  }

  async save(attachment: Attachment): Promise<void> {
    const attachmentToUpdateIndex = this.Attachments.findIndex(
      ({ id }) => id === attachment.id,
    )

    this.Attachments[attachmentToUpdateIndex] = attachment
  }

  async delete(id: string): Promise<void> {
    this.Attachments.filter((attachment) => attachment.id === id)
  }

  async findById(id: string): Promise<Attachment | null> {
    return this.Attachments.find((attachment) => attachment.id === id) || null
  }

  async findByUser(userId: string): Promise<Attachment | null> {
    return (
      this.Attachments.find((attachment) => attachment.patientId === userId) ||
      null
    )
  }

  async findMany(): Promise<Attachment[]> {
    return this.Attachments
  }
}
