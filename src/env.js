import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
  server: {
    AI_BASE_URL: z.string().url(),
    AI_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    AI_BASE_URL: process.env.AI_BASE_URL,
    AI_API_KEY: process.env.AI_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
