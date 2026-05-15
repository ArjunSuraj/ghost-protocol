import { NextResponse } from "next/server";

interface BreachResult {
  sources: string[];
  hash_password?: boolean;
  password?: string;
  sha1?: string;
  email?: string;
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
        details: [],
        passwordExposed: 0,
        warning: "BREACHDIRECTORY_API_KEY not configured. Showing Google Dork links only.",
      });
    }

    const response = await fetch(
      `https://breachdirectory.p.rapidapi.com/?func=auto&term=${encodeURIComponent(email)}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json({
          breaches: 0,
          sources: [],
          details: [],
          passwordExposed: 0,
          warning: "Rate limited. Showing Google Dork links only.",
        });
      }
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: "Invalid API key or not subscribed. Get a free key at rapidapi.com" },
          { status: response.status }
        );
      }
      return NextResponse.json(
        { error: `BreachDirectory API error (${response.status})` },
        { status: response.status }
      );
    }

    const data: BreachDirectoryResponse = await response.json();

    if (!data.success || !data.result || !Array.isArray(data.result)) {
      return NextResponse.json({
        breaches: 0,
        sources: [],
        details: [],
        passwordExposed: 0,
      });
    }

    const sources = data.result
      .flatMap((r) => r.sources)
      .filter((s): s is string => typeof s === "string" && s !== "Unknown")
      .filter((s, i, a) => a.indexOf(s) === i);

    const passwordExposed = data.result.filter((r) => r.hash_password).length;

    const details = data.result.map((r) => ({
      sources: r.sources.filter((s) => s !== "Unknown"),
      hashPassword: r.hash_password || false,
      password: r.password || null,
      sha1: r.sha1 || null,
    }));

    return NextResponse.json({
      breaches: data.found,
      sources,
      details,
      passwordExposed,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
