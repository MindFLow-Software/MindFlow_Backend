import { Injectable } from '@nestjs/common'

import { MedicalRecordRepository } from '@/core/domain/main/application/repositories/medical-record-repository'
import { MedicalRecordAttachment } from '@/core/domain/main/enterprise/entities/medical-record-attachment'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaMedicalRecordRepository implements MedicalRecordRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async createMany(attachments: MedicalRecordAttachment[]) {
    await this.prisma.attachment.updateMany({
      where: {
        id: attachments[0].patientId,
      },
      data: attachments,
    })
  }

  async create(attachment: MedicalRecordAttachment) {
    await this.prisma.attachment.update({
      where: {
        id: attachment.attachmentId,
      },
      data: attachment,
    })
  }

  async deleteMany(attachmentIds: string[]) {}
}
