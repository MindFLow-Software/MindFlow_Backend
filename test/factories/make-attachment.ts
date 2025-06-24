import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

import {
  Attachment,
  Iattachment,
} from '@/core/domain/enterprise/entities/attachment'

export const makeAttachment = async (override: Partial<Iattachment> = {}) => {
  const attachment = Attachment.create({
    id: randomUUID(),
    contentType: 'pdf',
    filename: 'new-attachment',
    fileUrl: faker.internet.url(),
    patientId: randomUUID(),
    sessionDate: new Date(),
    SizeInBytes: 5000,
    uploadedAt: new Date(),
    uploaderId: randomUUID(),
    ...override,
  })

  return attachment
}
