export const PORT = process.env.PORT ?? 4002;
export const DB_URI = process.env.MONGO_DB_URI ?? null;
export const PASS_PHRASE = process.env.PASS_PHRASE ?? null;
export const ORIGIN_WHITELIST =
  process.env.ORIGIN_WHITELIST?.split(",")?.map((org) => org?.trim()) ?? [];
export const TOKEN_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME ?? "2h";
