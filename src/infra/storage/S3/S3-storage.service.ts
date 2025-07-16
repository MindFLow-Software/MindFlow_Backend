import { Injectable } from '@nestjs/common'
import { EnvService } from '@/infra/env/env-service'

import { S3Client } from "@aws-sdk/client-s3"

@Injectable()
export class S3StorageService extends S3Client {
  constructor(
    envService: EnvService,
  ) {
    super({
      region: envService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: envService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: envService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    })
  }
}
