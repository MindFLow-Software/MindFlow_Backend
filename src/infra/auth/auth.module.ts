import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { Ienv } from '../../validators/env-schema'

import { AuthenticateController } from '../http/controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/core/domain/main/application/use-cases/authenticate'

import { LinkedInStrategy } from './linkedin.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Ienv, true>) {
        const jwtPrivateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const jwtPublicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwtPrivateKey, 'base64'),
          publicKey: Buffer.from(jwtPublicKey, 'base64'),
        }
      },
    }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateUseCase],
})
export class AuthModule { }
