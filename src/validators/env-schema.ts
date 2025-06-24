import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.number().default(8080),
})

export type Ienv = z.infer<typeof envSchema>
