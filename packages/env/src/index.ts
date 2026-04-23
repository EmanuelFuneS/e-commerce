import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const schemaEnv = z.object({
  NODE_ENV: z.string(),
  PRISMA_LOGS: z.string(),
  APP_BASE_URL: z.string(),
  REDIS_URL: z.string(),

  API_PORT: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
  MAILTRAP: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_API_ENV: z.string(),

  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  TENANT_ID_APP: z.string(),
  BYTE_BAZAR_URL: z.string(),
  AUTH_SERVICE_URL: z.string(),
  AUTH_APP_URL: z.string(),
  AUTHORIZED_ROLES: z.string(),
});

const result = schemaEnv.safeParse(process.env);

if (!result.success && process.env.NODE_ENV !== "production") {
  console.error("❌ Invalid environment variables:", result.error.format());
}

export const globalEnv = result.success
  ? result.data
  : (process.env as unknown as z.infer<typeof schemaEnv>);

export default globalEnv;
