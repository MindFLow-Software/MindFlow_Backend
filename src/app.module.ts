import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './validators/env-schema'

// Modules
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/auth/auth.module'
import { DatabaseModule } from './infra/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => {
        return envSchema.parse(env)
      },
      isGlobal: true,
    }),
    EnvModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
