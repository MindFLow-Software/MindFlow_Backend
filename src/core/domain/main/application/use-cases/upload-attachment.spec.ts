import { randomUUID } from "node:crypto"
import { File, FileType, UploadAttachmentUseCase } from "./upload-attachment"
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository"

let attachmentRepository: InMemoryAttachmentRepository
let sut: UploadAttachmentUseCase

describe('[POST]:UPLOAD', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAttachmentRepository()
    sut = new UploadAttachmentUseCase(attachmentRepository)
  })

  it('should be able to upload an attachment', async () => {
    const files: File[] = []

    files.push({
      name: 'Arquivo-1.jpeg',
      type: FileType.JPEG,
      size: 1024 * 1024 * 2, // 2MB
      url: 'http://localhost:8080/images/Arquivo-1.jpeg',

    })

    await sut.execute({
      files,
      sessionDate: new Date(),
      uploaderId: randomUUID(),
    })

    expect(attachmentRepository.Attachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          filename: 'Arquivo-1.jpeg',
          contentType: 'image/jpeg',
          SizeInBytes: 1024 * 1024 * 2,
          fileUrl: 'http://localhost:8080/images/Arquivo-1.jpeg',
        })
      ])
    )
  })
})
