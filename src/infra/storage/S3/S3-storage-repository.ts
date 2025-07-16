import { S3StorageService } from './S3-storage.service'
import { Iupload, StorageRepository } from '../storage-repository'

export class S3torageRepository implements StorageRepository {
  constructor(
    storage: S3StorageService
  ) {}

   async upload({ filename, mimetype, buffer }: Iupload) {
      let key = ''
  
      return {
        url: key,
      }
    }
  
    async retrieve(key: string) {
      return {
        url: '',
      }
    }
}
