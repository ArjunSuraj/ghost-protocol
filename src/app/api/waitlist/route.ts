import { NextResponse } from "next/server";

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

    // Phase 1: Log to console (replace with Supabase/Resend integration)
    console.log(`[WAITLIST] New signup: ${email}`);

    // TODO: Insert into Supabase
    // const { error } = await supabase.from("waitlist").insert({ email });

    // TODO: Send confirmation email via Resend
    // await resend.emails.send({ ... });

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
