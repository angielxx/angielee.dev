import { NextRequest, NextResponse } from "next/server";
import { incrementViews } from "@/lib/redis";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  await incrementViews(slug);
  return NextResponse.json({ ok: true });
}
