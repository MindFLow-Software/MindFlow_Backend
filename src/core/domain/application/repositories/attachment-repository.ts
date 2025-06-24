import { Attachment } from '../../enterprise/entities/attachment'

type IfindMany = {
  pageIndex: number
  perPage: number
}

export abstract class AttachmentRepository {
  abstract create(attachment: Attachment): Promise<void>
  abstract save(attachment: Attachment): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Attachment | null>
  abstract findByUser(userId: string): Promise<Attachment | null>
  abstract findMany({ pageIndex, perPage }: IfindMany): Promise<Attachment[]>
}
