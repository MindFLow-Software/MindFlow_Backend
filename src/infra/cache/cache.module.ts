import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { RedisService } from './redis/redis.service'
import { CacheRepository } from './cache-repository'
import { RedisCacheRepository } from './redis/redis-cache-repository'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [RedisService],
})
export class CacheModule {}