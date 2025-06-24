import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

import { Ienv } from './validators/env-schema'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService: ConfigService<Ienv, true> = await app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}

bootstrap()
