import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().default(8080),

  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_DB_INDEX: z.coerce.number().default(0),

  AWS_BUCKET_NAME: z.string(),
  AWS_S3_REGION: z.string(),
  AWS_S3_ACCESS_KEY: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
})

export type Ienv = z.infer<typeof envSchema>
