export const PORT = process.env.API_PORT ?? 4002;
export const DB_URI = process.env.MONGO_DB_URI ?? null;
export const PASS_PHRASE = process.env.PASS_PHRASE ?? null;
export const ORIGIN_WHITELIST =
  process.env.ORIGIN_WHITELIST?.split(",")?.map((org) => org?.trim()) ?? [];
