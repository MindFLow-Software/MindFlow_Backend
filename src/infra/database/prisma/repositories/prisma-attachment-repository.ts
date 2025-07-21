import { Injectable } from '@nestjs/common'

import { Attachment } from '@/core/domain/main/enterprise/entities/attachment'
import { AttachmentRepository } from '@/core/domain/main/application/repositories/attachment-repository'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor() {}

  async create(attachment: Attachment) {}

  async createMany(attachments: Attachment[]) {}
}