import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),

  // SWAGGER
  API_NAME: z.string(),
  API_SERVER: z.string(),
  API_DESCRIPTION: z.string(),
  API_VERSION: z.string(),
  API_TAGS: z.string(),

  // REDIS
  REDIS_HOST: z.string(),
  REDIS_USER: z.string(),
  REDIS_PW: z.string(),
  REDIS_PORT: z.string(),
});

export type Env = z.infer<typeof envSchema>;
