import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const WAITLIST_KEY = "waitlist:entries";
const COUNT_KEY = "waitlist:count";

export async function POST(request: Request) {
  try {
    const { email, name, experience, instagram } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const entry = {
      email: email.trim().toLowerCase(),
      name: name?.trim() || "",
      experience: experience || "",
      instagram: instagram?.trim().replace(/^@/, "") || "",
      joinedAt: new Date().toISOString(),
    };

    const redis = getRedis();
    if (redis) {
      // Check for duplicate email
      const existing = await redis.lrange(WAITLIST_KEY, 0, -1) as Record<string, string>[];
      if (existing.some((e) => e.email === entry.email)) {
        return NextResponse.json({ error: "Already on the waitlist!" }, { status: 409 });
      }
      await redis.rpush(WAITLIST_KEY, entry);
      await redis.incr(COUNT_KEY);
      const count = await redis.get(COUNT_KEY) as number;
      return NextResponse.json({ success: true, position: count });
    }

    // Fallback: log to console if Redis not configured (dev mode)
    console.log("WAITLIST SIGNUP (no Redis):", entry);
    return NextResponse.json({ success: true, position: 1 });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ count: 0 });
  const count = (await redis.get(COUNT_KEY) as number) || 0;
  return NextResponse.json({ count });
}
