import { NextRequest, NextResponse } from "next/server";
import { evaluate } from "@/src/engine/evaluate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = evaluate(body);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_JSON",
          message: "Request body must be valid JSON.",
          issues: [],
        },
      },
      { status: 400 }
    );
  }
}