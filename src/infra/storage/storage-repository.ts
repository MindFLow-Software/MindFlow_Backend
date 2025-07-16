export enum Mimetypes {
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  PDF = 'application/pdf',
  WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

export type Iupload = {
 filename: string
 mimetype: Mimetypes
 buffer: Buffer
}

export abstract class StorageRepository {
  abstract upload({ filename, mimetype, buffer }: Iupload): Promise<{ url: string }>
  abstract retrieve(key: string): Promise<{ url: string }>
}
