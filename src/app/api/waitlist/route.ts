import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    await initDb();

    try {
      await query(
        "INSERT INTO waitlist (email) VALUES ($1)",
        [email]
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("duplicate key")) {
        return NextResponse.json(
          { error: "Email already on waitlist" },
          { status: 409 }
        );
      }
      throw err;
    }

    console.log(`[WAITLIST] New signup: ${email}`);

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[WAITLIST] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
