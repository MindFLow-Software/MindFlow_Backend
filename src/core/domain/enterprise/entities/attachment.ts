import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'
import { randomUUID } from 'node:crypto'

export type Iattachment = {
  id: string
  patientId: string
  uploaderId: string
  filename: string
  SizeInBytes: number
  contentType: string
  sessionDate: Date
  fileUrl: string | null
  uploadedAt: Date
  updatedAt: Date
}

export class Attachment extends Entity<Iattachment> {
  get id() {
    return this.props.id
  }

  set patientId(newPatientId: string) {
    this.props.patientId = newPatientId
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

  set fileUrl(newUrl: string | null) {
    this.props.fileUrl = newUrl
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

  static create(
    props: Optional<Iattachment, 'id' | 'patientId' | 'updatedAt'>,
  ) {
    const attachment = new Attachment({
      ...props,
      id: props.id || randomUUID(),
      patientId: props.patientId || randomUUID(),
      updatedAt: props.updatedAt || new Date(),
    })

    return attachment
  }
}
