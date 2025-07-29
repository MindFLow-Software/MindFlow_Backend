import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { EnvService } from '@/infra/env/env-service'

import Redis from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(
    envService: EnvService,
  ) {
    super({
      host: envService.get('REDIS_HOST'),
      port: envService.get('REDIS_PORT'),
      db: envService.get('REDIS_DB_INDEX'),
    })
  }

  // onModuleInit() {
  //   return this.connect()
  // }

  onModuleDestroy() {
    return this.disconnect()
  }
}