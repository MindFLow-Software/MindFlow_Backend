import { WatchedList } from '@/core/entities/watched-list'
import { Attachment } from './attachment'

export class MedicalRecordList extends WatchedList<Attachment> {
  compareItems(a: Attachment, b: Attachment) {
    return a.id === b.id
  }
}
