import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './validators/env-schema'

// Modules
import { HttpModule } from './infra/http.module'
import { AuthModule } from './infra/auth/auth.module'
import { DatabaseModule } from './infra/database/prisma/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => {
        return envSchema.parse(env)
      },
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
