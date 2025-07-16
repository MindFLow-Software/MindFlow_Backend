import { Ienv } from '@/validators/env-schema'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(
    private configService: ConfigService<Ienv, true>
  ) {}

  get<T extends keyof Ienv>(key: T) {
    return this.configService.get(key, { infer: true })
  }
}