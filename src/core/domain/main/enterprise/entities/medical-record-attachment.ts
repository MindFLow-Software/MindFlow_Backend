import { Entity } from '@/core/entities/entity'

type ImedicalRecordAttachment = {
  psychologistId: string
  patientId: string
  attachmentId: string
}

export class MedicalRecordAttachment extends Entity<ImedicalRecordAttachment> {
  get psychologistId() {
    return this.props.psychologistId
  }

  get patientId() {
    return this.props.patientId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: ImedicalRecordAttachment) {
    const medicalRecordAttachment = new MedicalRecordAttachment({
      ...props,
    })

    return medicalRecordAttachment
  }
}