import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './validators/env-schema'
import { HttpModule } from './infra/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => {
        return envSchema.parse(env)
      },
      isGlobal: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
