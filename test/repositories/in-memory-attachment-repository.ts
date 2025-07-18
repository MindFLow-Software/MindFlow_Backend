import { AttachmentRepository } from '@/core/domain/main/application/repositories/attachment-repository'
import { Attachment } from '@/core/domain/main/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryAttachmentRepository implements AttachmentRepository {
  public Attachments: Attachment[] = []

  constructor() { }

  async create(attachment: Attachment): Promise<void> {
    this.Attachments.push(attachment)
  }

  async createMany(attachments: Attachment[]) {
    this.Attachments.push(...attachments)
  }

  // async save(attachment: Attachment): Promise<void> {
  //   const attachmentToUpdateIndex = this.Attachments.findIndex(
  //     ({ id }) => id === attachment.id,
  //   )

  //   this.Attachments[attachmentToUpdateIndex] = attachment
  // }

  // async delete(id: string): Promise<void> {
  //   this.Attachments = this.Attachments.filter(
  //     (attachment) => attachment.id === id,
  //   )
  // }

  // async findById(id: string): Promise<Attachment | null> {
  //   return this.Attachments.find((attachment) => attachment.id === id) || null
  // }

  // async findByUser(userId: string): Promise<Attachment | null> {
  //   return (
  //     this.Attachments.find((attachment) => attachment.patientId === userId) ||
  //     null
  //   )
  // }

  // async findMany(): Promise<Attachment[]> {
  //   return this.Attachments
  // }
}
