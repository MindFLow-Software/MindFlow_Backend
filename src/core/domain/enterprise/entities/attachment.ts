import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'

export type Iattachment = {
  id: string
  patientId: string
  uploaderId: string
  filename: string
  SizeInBytes: number
  contentType: string
  sessionDate: Date
  fileUrl: string
  uploadedAt: Date
  updatedAt: Date
}

export class Attachment extends Entity<Iattachment> {
  get id() {
    return this.props.id
  }

  get patientId() {
    return this.props.patientId
  }

  get uploaderId() {
    return this.props.uploaderId
  }

  get filename() {
    return this.props.filename
  }

  get SizeInBytes() {
    return this.props.SizeInBytes
  }

  get contentType() {
    return this.props.contentType
  }

  get sessionDate() {
    return this.props.sessionDate
  }

  get fileUrl() {
    return this.props.fileUrl
  }

  get uploadedAt() {
    return this.props.uploadedAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<Iattachment, 'updatedAt'>) {
    const attachment = new Attachment({
      ...props,
      updatedAt: props.updatedAt || new Date(),
    })

    return attachment.props
  }
}
