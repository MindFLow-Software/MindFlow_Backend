import { Injectable } from '@nestjs/common'

import { Attachment } from '@/core/domain/main/enterprise/entities/attachment'
import { AttachmentRepository } from '@/core/domain/main/application/repositories/attachment-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(attachment: Attachment) {
    await this.prisma.attachment.create({
      data: {
        contentType: attachment.contentType,
        filename: attachment.filename,
        fileUrl: attachment.fileUrl!,
        SizeInBytes: attachment.SizeInBytes,
        patientId: attachment.patientId,
        uploaderId: attachment.uploaderId,
        sessionDate: attachment.sessionDate,
        uploadedAt:  attachment.uploadedAt,
      },
    })
  }

  async createMany(attachments: Attachment[]) {
    await this.prisma.attachment.createMany({
      data: attachments.map((attachment) => {
        return {
        contentType: attachment.contentType,
        filename: attachment.filename,
        fileUrl: attachment.fileUrl!,
        SizeInBytes: attachment.SizeInBytes,
        patientId: attachment.patientId,
        uploaderId: attachment.uploaderId,
        sessionDate: attachment.sessionDate,
        uploadedAt:  attachment.uploadedAt,
      }
      })
    })
  }
}