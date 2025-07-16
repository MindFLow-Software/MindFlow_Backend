import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CacheRepository } from './cache-repository'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: CacheRepository,
      useClass: 
    },
  ],
  exports: [CacheStorage],
})
export class CacheModule { }