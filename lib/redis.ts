import { Redis } from "@upstash/redis";

const VIEWS_KEY = "post:views";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export async function incrementViews(slug: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.zincrby(VIEWS_KEY, 1, slug);
}

export async function getTopSlugs(count: number): Promise<string[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const results = await redis.zrange(VIEWS_KEY, 0, count - 1, { rev: true });
    return results as string[];
  } catch {
    return [];
  }
}
