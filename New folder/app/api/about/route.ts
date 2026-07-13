import { NextResponse } from "next/server";
import { getAboutContentDb } from "@/lib/data";

export async function GET() {
  const about = await getAboutContentDb();
  return NextResponse.json(about);
}
