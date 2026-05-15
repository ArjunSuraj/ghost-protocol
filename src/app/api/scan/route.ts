import { NextResponse } from "next/server";

interface BreachResult {
  sources: string[];
  has_password?: boolean;
  password?: string;
  sha1?: string;
}

interface BreachDirectoryResponse {
  success: boolean;
  found: number;
  result: BreachResult[];
}

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

    const apiKey = process.env.BREACHDIRECTORY_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        breaches: 0,
        sources: [],
        warning: "BREACHDIRECTORY_API_KEY not configured. Showing Google Dork links only.",
      });
    }

    const response = await fetch(
      `https://breachdirectory.p.rapidapi.com/?query=${encodeURIComponent(email)}&type=email`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json({
          breaches: 0,
          sources: [],
          warning: "Rate limited. Showing Google Dork links only.",
        });
      }
      return NextResponse.json(
        { error: "Breach check failed" },
        { status: response.status }
      );
    }

    const data: BreachDirectoryResponse = await response.json();

    if (!data.success || !data.result) {
      return NextResponse.json({
        breaches: 0,
        sources: [],
      });
    }

    const sources = data.result.flatMap((r) => r.sources).filter((s, i, a) => a.indexOf(s) === i);

    return NextResponse.json({
      breaches: data.found,
      sources,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
