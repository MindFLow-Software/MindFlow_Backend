import { randomUUID } from 'node:crypto'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentRepository } from '../repositories/attachment-repository'
import { Injectable } from '@nestjs/common'

export enum FileType {
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg'
}

export type File = {
    name: string
    type: FileType
    size: number
    url: string
  }

type IuploadAttachmentRequest = {
  files: File[]
  sessionDate: Date
  uploaderId: string
}

@Injectable()
export class UploadAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute({ files, sessionDate, uploaderId }: IuploadAttachmentRequest) {
    const attachments = files.map((file) =>
      Attachment.create({
        filename: file.name,
        contentType: file.type,
        SizeInBytes: file.size,
        fileUrl: file.url,
        uploaderId,
        sessionDate,
        uploadedAt: new Date(),
      }),
    )

    await this.attachmentRepository.createMany(attachments)
  }
}
