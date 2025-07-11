import { randomUUID } from 'node:crypto'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentRepository } from '../repositories/attachment-repository'

type IuploadAttachmentRequest = {
  files: File[]
}

export class UploadAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute({ files }: IuploadAttachmentRequest) {
    const attachments = files.map((file) =>
      Attachment.create({
        filename: file.name,
        contentType: file.type,
        SizeInBytes: file.size,
        fileUrl: null,
        sessionDate: new Date(),
        uploadedAt: new Date(),
        uploaderId: randomUUID(),
      }),
    )

    this.attachmentRepository.createMany(attachments)
  }
}
